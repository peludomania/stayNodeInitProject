import { Router, Request, Response, IRouter, NextFunction } from "express";
import { Config } from "../Config";
import { logger, eslog } from "../infrastructure/Logger";
import * as moment from "moment";

// Interfaces
import { ITypes } from "../domain/Application";

import "reflect-metadata"; // tslint:disable-line:no-import-side-effect
import { inject, injectable } from "inversify";
import { IKafkaProducer } from "../infrastructure/KafkaProducer";

const TYPES: ITypes = Config.TYPES;

export interface IExpressRouter {
  create(): IRouter<void>;
}

@injectable()
export class ExpressRouter implements IExpressRouter {

  private producer: IKafkaProducer;

  public constructor(@inject(TYPES.IKafkaProducer) producer: IKafkaProducer) {
    this.producer = producer;
  }

  /**
   * Crea las rutas de Express
   */
  public create(): IRouter<void> {

    const router: Router = Router();

    router.post("/legacy", (req: Request, res: Response): void => {
      //logger.info('Received new LEGACY event');
      logger.info("Received new LEGACY event", req.body);
      //eslog.info({ event: "tmHookLegacy", payload: req.body });
      //this.producer.sendDomainEvent("stayapp.", { service: Config.SERVICE_NAME, datetime: moment().format("YYYY-MM-DD hh:ss"), event: "tmHookLegacy", establishment: req.body.service_tag_list.stay_establishment_id, payload: req.body });
      res.status(200).send(JSON.stringify({ success: true, errors: [], data: [] }));
    });

/*    router.post("/hook/hotelkit", (req: Request, res: Response): void => {
      logger.info("Received new HOTELKIT event", req.body);
      eslog.info({ event: "tmHookHotelKit", payload: req.body });
      this.producer.sendDomainEvent("task-manager", { service: Config.SERVICE_NAME, datetime: moment().format("YYYY-MM-DD hh:ss"), event: "tmHookHotelKit", payload: req.body });
      res.status(200).send(JSON.stringify({ success: true, errors: [], data: [] }));
    });*/

    return router;
  }
}

