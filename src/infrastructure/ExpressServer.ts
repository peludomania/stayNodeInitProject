import * as express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as _ from "lodash";
import * as cors from "cors";
import * as helmet from "helmet";

import { Express, IRouter } from "express";
import { Server } from "http";

import { Config } from "../Config";
import { logger } from "./Logger";

import "reflect-metadata"; // tslint:disable-line:no-import-side-effect
import { injectable } from "inversify";

export interface IExpressServer {
  init(): void;
  stop(callback: Function): void;
  registerRoute(path: string, route: IRouter<void>): void;
}

@injectable()
export class ExpressServer implements IExpressServer {

  private app: Express;
  private server: Server;

  public constructor() {
    this.app = express();
  }

  public init(): void {
    logger.info(`express server initializing ...`);

    this.app.use(bodyParser.json());
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(morgan("combined", { stream: { write: message => logger.debug(message.trim()) } }));
    this.app.get("/liveness", (req: express.Request, res: express.Response): void => {
      res.send({ liveness: true });
      res.end();
    });

    this.server = this.app.listen(Config.SERVICE_PORT, () => {
      logger.info(`express server up and running (${Config.SERVICE_PORT})`);
    });
  }

  public stop(callback: Function): void {
    this.server.close(callback);
  }

  public registerRoute(path: string, route: IRouter<void>): void {
    this.app.use(path, route);
  }
}

