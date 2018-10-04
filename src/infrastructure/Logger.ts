import * as Bunyan from "bunyan";
import * as BunyanFormat from "bunyan-format";
import * as BunyanElasticSearch from "bunyan-elasticsearch-bulk";
import * as process from "process";

import { Config } from "../Config";
export const eslog: Bunyan = Bunyan.createLogger({
  name: Config.SERVICE_NAME,
  streams: [
    {
      level: "info",
      stream: new BunyanElasticSearch({
        indexPattern: "[stay-]YYYY.MM.DD",
        type: "logs",
        host: Config.ELASTIC_CLIENT,
        limit: 50,
        interval: 10000,
      }),
    },
  ],
});

export const logger: Bunyan = Bunyan.createLogger({
  name: Config.SERVICE_NAME,
  serializers: {
    req: Bunyan.stdSerializers.req,
    res: Bunyan.stdSerializers.res,
    err: Bunyan.stdSerializers.err,
  },
  streams: [{
    stream: BunyanFormat({ outputMode: "short" }),
    level: "info",
  }, {
    type: "rotating-file",
    path: "./logs.log",
    period: "1d",
    count: 3,
    level: "info",
  }],
});
