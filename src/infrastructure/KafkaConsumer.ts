import * as events from "events";
import * as Kafka from "kafka-node";

import { Config } from "../Config";
import { logger } from "./Logger";

import "reflect-metadata"; // tslint:disable-line:no-import-side-effect
import { injectable } from "inversify";

import { ICommit } from "../domain/Application";

export interface IKafkaConsumer extends events.EventEmitter {
  init(): void;
  stop(callback: (err: Error) => void): void;
  registerOn(action: string, callback: (domainEvent: ICommit) => void): void;
}

@injectable()
export class KafkaConsumer extends events.EventEmitter implements IKafkaConsumer {

  private consumer: Kafka.ConsumerGroup;
  private domainEventListeners: IDomainEventListeners = {};
  private kafkaReady: boolean = false;
  private consumerGroupOptions: Kafka.ConsumerGroupOptions = {
    host: Config.KAFKA_CONN_STRING,
    groupId: Config.KAFKA_GROUP_ID,
  };

  public constructor() {
    super();
  }

  public init(): void {

    logger.info(`kafka consumer client initializing ...`);

    this.consumer = new Kafka.ConsumerGroup(this.consumerGroupOptions, Config.KAFKA_TOPICS);
    this.kafkaReady = true;

    this.consumer.on("error", (err: Error): void => {
      if (this.kafkaReady) {
        logger.error(`kafka consumer error, ${err.toString()}`);
        this.kafkaReady = false;
        this.emit("offline");
      }
    });

    this.consumer.on("message", (message: IKafkaMessage): void => {
      logger.info("new message received .... ", message);
      const domainEvent: ICommit = JSON.parse(message.value);
      this.onDomainEvent(domainEvent);
    });

  }

  public stop(callback: (err: Error) => void): void {
    if (this.consumer !== undefined) {
      this.consumer.close(false, () => callback);
      this.consumer = undefined;
    }
    if (this.domainEventListeners !== undefined) {
      this.domainEventListeners = undefined;
    }
  }

  public registerOn(action: string, callback: (domainEvent: ICommit) => void): void {
    if (!this.domainEventListeners[action]) {
      this.domainEventListeners[action] = [];
    }
    this.domainEventListeners[action].push(callback);
  }

  private onDomainEvent(domainEvent: ICommit): void {
    if (this.domainEventListeners[domainEvent.event]) {
      this.domainEventListeners[domainEvent.event].forEach(listener => listener(domainEvent));
    }
  }
}

interface IKafkaMessage {
  topic: string;
  value: string;
  offset: number;
  partition: number;
  key: number;
}

interface IDomainEventListeners {
  [key: string]: ((domainEvent: ICommit) => void)[];
}
