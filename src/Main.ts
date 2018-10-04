import "reflect-metadata"; // tslint:disable-line:no-import-side-effect
import { Container } from "inversify";
import { Config } from "./Config";

import { ITypes } from "./domain/Application";

import { MongoDBClient, IDatabase } from "./infrastructure/Database";
import { ExpressServer, IExpressServer } from "./infrastructure/ExpressServer";
import { KafkaConsumer, IKafkaConsumer } from "./infrastructure/KafkaConsumer";
import { KafkaProducer, IKafkaProducer } from "./infrastructure/KafkaProducer";

import { Application, IApplication } from "./Application";

import { ExpressRouter, IExpressRouter } from "./application/ExpressRouter";

const TYPES: ITypes = Config.TYPES;

export const container: Container = new Container();

container.bind<IApplication>(TYPES.IApplication).to(Application);
container.bind<IDatabase>(TYPES.IDatabase).to(MongoDBClient).inSingletonScope();
container.bind<IExpressServer>(TYPES.IExpressServer).to(ExpressServer);
container.bind<IKafkaConsumer>(TYPES.IKafkaConsumer).to(KafkaConsumer).inSingletonScope();
container.bind<IKafkaProducer>(TYPES.IKafkaProducer).to(KafkaProducer).inSingletonScope();

container.bind<IExpressRouter>(TYPES.IExpressRouter).to(ExpressRouter);

const application: IApplication = container.get<IApplication>(TYPES.IApplication);
application.main();

