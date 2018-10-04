// tslint:disable:max-line-length
import * as process from "process";
import { ITypes } from "./domain/Application";

const IS_DEPLOYED: boolean = process.env.DEPLOYED === "true";

export class Config {

  public static SERVICE_NAME: string = "establishment";
  public static SERVICE_PORT: number = 3000;
  public static SERVICE_URL: string = IS_DEPLOYED ? `${process.env.AMBASSADOR_URL}` : `http://localhost:${Config.SERVICE_PORT}`;

  public static KAFKA_GROUP_ID: string = "establishment";
  public static KAFKA_TOPICS: string[] = ["establishment"];
  public static MONGODB_DATABASE: string = "establishment";

  public static KAFKA_CONN_STRING: string = IS_DEPLOYED ? process.env.KAFKA_CONN_STRING : "localhost:2181";
  public static MONGODB_CONN_STRING: string = IS_DEPLOYED ? process.env.MONGODB_CONN_STRING : "mongodb://localhost/establishment";
  public static ELASTIC_CLIENT: string = IS_DEPLOYED ? process.env.ELASTIC_CLIENT : "http://localhost:9200";

  public static LEGACY_BASIC_AUTH: string = IS_DEPLOYED ? process.env.LEGACY_BASIC_AUTH : "Basic YWxiZXJ0by52YWxlcmFAc3RheS1hcHAuY29tOklyb24xOTg0";
  public static LEGACY_API_URL: string = IS_DEPLOYED ? process.env.LEGACY_API_URL : "https://api-int.stay-app.com/v1";
  public static LEGACY_CMS_URL: string = IS_DEPLOYED ? process.env.LEGACY_CMS_URL : "https://api-cms-int.stay-app.com";
  public static LEGACY_EXTERNAL_USERNAME: string = IS_DEPLOYED ? process.env.LEGACY_EXTERNAL_USERNAME : "santiago@stay-app.com";
  public static LEGACY_EXTERNAL_PASSWORD: string = IS_DEPLOYED ? process.env.LEGACY_EXTERNAL_PASSWORD : "7b3639a4ab39765739a5e0ed75bc8016";

  public static TYPES: ITypes = {
    IApplication: Symbol("Application"),
    IDatabase: Symbol("MongoDBClient"),
    IExpressServer: Symbol("ExpressServer"),
    IKafkaConsumer: Symbol("KafkaConsumer"),
    IKafkaProducer: Symbol("KafkaProducer"),
    IExpressRouter: Symbol("ExpressRouter"),
  };
}
