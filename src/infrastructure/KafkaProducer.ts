import * as events from "events";
import * as Kafka from "kafka-node";

import { Config } from "../Config";
import { logger } from "./Logger";

import "reflect-metadata"; // tslint:disable-line:no-import-side-effect
import { injectable } from "inversify";

import { ICommit } from "../domain/Application";

export interface IKafkaProducer extends events.EventEmitter {
  init(): void;

  stop(callback: (err: Error) => void): void;
  sendDomainEvent(topic: string, message: ICommit): Promise<{}>;
}

@injectable()
export class KafkaProducer extends events.EventEmitter implements IKafkaProducer {

  private client: Kafka.Client;
  private producer: Kafka.HighLevelProducer;
  private kafkaReady: boolean = false;

  public constructor() {
    super();
  }

  public init(): void {

    logger.info(`kafka producer client initializing ...`);

    this.client = new Kafka.Client (Config.KAFKA_CONN_STRING, Config.SERVICE_NAME);
    this.producer = new Kafka.HighLevelProducer(this.client);

    this.producer.on("ready", data => {
      if (!this.kafkaReady) {
        logger.info(`kafka producer connected`);
        this.kafkaReady = true;
        this.emit("ready");
      }
    });

    this.producer.on("error", (err: Error): void => {
      if (this.kafkaReady) {
        logger.error(`kafka producer error, ${err.toString()}`);
        this.kafkaReady = false;
        this.emit("offline");
      }
    });
  }

  public stop(callback: (err: Error) => void): void {
    if (this.producer !== undefined) {
      this.producer.close(callback);
      this.producer = undefined;
    }
  }

  public async sendDomainEvent(topic: string, message: ICommit): Promise<{}> {
    const payloads: Kafka.ProduceRequest[] = [
      {
        topic,
        messages: JSON.stringify(message),
      },
    ];

    return new Promise((resolve, reject) => {
      this.producer.send(payloads, (error: Error, data: Object): void => {
        if (error) {
          logger.error(`kafka producer error while sending message, ${error.toString()}, ${data}`);
          reject(error);
        } else {
          logger.debug(`kafka producer message sent`, payloads);
          resolve(data);
        }
      });
    });
  }
}

