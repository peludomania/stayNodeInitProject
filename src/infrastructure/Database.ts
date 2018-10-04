import * as events from "events";
import * as Mongo from "mongodb";

import { Config } from "../Config";
import { logger } from "./Logger";

import "reflect-metadata"; // tslint:disable-line:no-import-side-effect
import { injectable } from "inversify";

export interface IDatabase extends events.EventEmitter {
  db: Mongo.Db;
  init(): void;
  stop(callback: (err: Error) => void): void;
}

@injectable()
export class MongoDBClient extends events.EventEmitter implements IDatabase {

  public db: Mongo.Db;
  private client: Mongo.MongoClient;

  public constructor() {
    super();
  }

  public async init(): Promise<void> {
    try {
      logger.info(`mongo client initializing ...`);
      this.client = await Mongo.MongoClient.connect(Config.MONGODB_CONN_STRING);
      this.db = this.client.db(Config.MONGODB_DATABASE);
      logger.info(`mongo client connected ...`);
      this.emit("ready");
    } catch (e) {
      logger.error(`mongo client error ...`);
      this.emit("offline");
    }
  }

  public stop(callback: (err: Error) => void): void {
    this.client.close(true).catch(callback);
  }
}

