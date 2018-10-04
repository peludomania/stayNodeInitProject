import { logger } from "./infrastructure/Logger";
import { Config } from "./Config";

import { ITypes } from "./domain/Application";

import "reflect-metadata"; // tslint:disable-line:no-import-side-effect
import { injectable, inject, decorate } from "inversify";
import { IExpressServer } from "./infrastructure/ExpressServer";
import { IDatabase } from "./infrastructure/Database";
import { IKafkaConsumer } from "./infrastructure/KafkaConsumer";
import { IKafkaProducer } from "./infrastructure/KafkaProducer";

import { IExpressRouter } from "./application/ExpressRouter";

import { IRouter } from "express";
import * as events from "events";

const TYPES: ITypes = Config.TYPES;

export interface IApplication {
  main(): void;
}

decorate(injectable(), events.EventEmitter);

@injectable()
export class Application implements IApplication {

  private expressServer: IExpressServer;
  private kafkaConsumer: IKafkaConsumer;
  private kafkaProducer: IKafkaProducer;
  private database: IDatabase;

  private expressRouter: IRouter<void>;

  private kafkaConsumerReady: boolean = true;
  private kafkaProducerReady: boolean = true;
  private dbReady: boolean = false;
  private serviceReady: boolean = false;

  public constructor(@inject(TYPES.IExpressServer) expressServer: IExpressServer,
                     @inject(TYPES.IKafkaConsumer) kafkaConsumer: IKafkaConsumer,
                     @inject(TYPES.IKafkaProducer) kafkaProducer: IKafkaProducer,
                     @inject(TYPES.IDatabase) database: IDatabase,
                     @inject(TYPES.IExpressRouter) expressRouter: IExpressRouter) {

    this.expressServer = expressServer;
    this.kafkaConsumer = kafkaConsumer;
    this.kafkaProducer = kafkaProducer;
    this.database = database;

    this.expressRouter = expressRouter.create();

  }

  public main(): void {

    process.on("SIGINT", () => this.stop());
    process.on("SIGTERM", () => this.stop());

    this.database.init();
    this.expressServer.init();
    this.kafkaProducer.init();
    this.kafkaConsumer.init();
    this.serviceEventHandler();

    setTimeout(() => {
      if (!this.serviceReady) {
        logger.error("️unable to bootstrap the service, stopping ...");
        this.stop();
      }
    }, 10000);
  }

  private stop(): void {

    this.expressServer.stop(() => {
      logger.info(`express server stopped.`);
    });

    // Exit Node process
    setTimeout(() => {
      process.exit();
    }, 2000);
  }

  private start(): void {
    this.serviceReady = true;
    logger.info("all service dependencies up and running, starting service");
    this.expressServer.registerRoute("/", this.expressRouter);
  }

  private serviceEventHandler(): void {

    this.kafkaConsumer.on("ready", () => {
      logger.info("this.kafkaConsumer.on.ready");
      this.kafkaConsumerReady = true;
      if (!this.serviceReady && this.dbReady && this.kafkaProducerReady) {
        this.start();
      }
    });

    this.kafkaConsumer.on("offline", () => {
      logger.info("this.kafkaConsumer.on.offline");
      this.serviceReady = false;
      this.kafkaConsumerReady = false;
      logger.fatal("missing critical dependecies, stopping service ...");
      this.stop();
    });

    this.kafkaProducer.on("ready", () => {
      logger.info("this.kafkaProducer.on.ready");
      this.kafkaProducerReady = true;
      if (!this.serviceReady && this.dbReady && this.kafkaConsumerReady) {
        this.start();
      }
    });

    this.kafkaProducer.on("offline", () => {
      logger.info("this.kafkaProducer.on.offline");
      this.serviceReady = false;
      this.kafkaProducerReady = false;
      logger.fatal("️missing critical dependecies, stopping service ...");
      this.stop();
    });

    this.database.on("ready", () => {
      logger.info("this.database.on.ready");
      this.dbReady = true;
      if (!this.serviceReady && this.kafkaConsumerReady && this.kafkaProducerReady) {
        this.start();
      }
    });

    this.database.on("offline", () => {
      logger.info("this.database.on.offline");
      this.dbReady = false;
      this.serviceReady = false;
      logger.fatal("️missing critical dependecies, stopping service ...");
      this.stop();
    });

  }
}
