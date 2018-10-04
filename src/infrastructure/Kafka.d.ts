// Type definitions for kafka-node 2.3.2
// Project: https://github.com/SOHU-Co/kafka-node/
// Definitions by: Santiago Diaz <santiago@me.com>

declare module "kafka-node" {

    import { EventEmitter } from "events";

    // # Classes
    class Client extends EventEmitter {
        constructor(connectionString: string, clientId: string, zkOptions?: ZKOptions, noAckBatchOptions?: any, sslOptions?: any);
        addTopics(topics: Array<string>, cb: (error: any, topics: Array<string>) => any): any;
        brokerForLeader(leader: any, longpolling: any): any;
        checkMetadatas(payloads: any): any;
        clearCallbackQueue(socket: any, error: any): void;
        close(callback?: Function): void;
        closeBrokers(brokers: any): void;
        connect(): any;
        createBroker(host: any, port: any, longpolling: any): any;
        createTopics(topics: any, isAsync: any, cb: Function): any;
        getBrokers(longpolling: any): any;
        handleReceivedData(socket: any): void;
        hasMetadata(topic: any, partition: any): any;
        leaderByPartition(topic: any, partition: any): any;
        loadMetadataForTopics(topics: any, cb: any): any;
        nextId(): any;
        nextSocketId(): any;
        payloadsByLeader(payloads: any): any;
        queueCallback(socket: any, id: any, data: any): void;
        reconnectBroker(oldSocket: any): void;
        refreshBrokers(): any;
        refreshMetadata(topics: Array<string>, cb?: (error: any, data: any) => any): void;
        removeTopicMetadata(topics: any, cb: any): void;
        send(payloads: any, encoder: any, decoder: any, cb: any): any;
        sendFetchRequest(consumer: any, payloads: any, fetchMaxWaitMs: any, fetchMinBytes: any, maxTickMessages: any, ...args: any[]): any;
        sendGroupCoordinatorRequest(groupId: any, cb: any, ...args: any[]): void;
        sendGroupRequest(encode: any, decode: any, requestArgs: any): any;
        sendHeartbeatRequest(groupId: any, generationId: any, memberId: any, cb: any, ...args: any[]): void;
        sendJoinGroupRequest(groupId: any, memberId: any, sessionTimeout: any, groupProtocol: any, cb: any, ...args: any[]): void;
        sendLeaveGroupRequest(groupId: any, memberId: any, cb: any, ...args: any[]): void;
        sendOffsetCommitRequest(group: any, payloads: any, cb: any): void;
        sendOffsetCommitV2Request(group: any, generationId: any, memberId: any, payloads: any, cb: any, ...args: any[]): void;
        sendOffsetFetchRequest(group: any, payloads: any, cb: any): void;
        sendOffsetFetchV1Request(group: any, payloads: any, cb: any, ...args: any[]): void;
        sendOffsetRequest(payloads: any, cb: any): void;
        sendProduceRequest(payloads: any, requireAcks: any, ackTimeoutMs: any, cb: any): any;
        sendSyncGroupRequest(groupId: any, generationId: any, memberId: any, groupAssignment: any, cb: any, ...args: any[]): void;
        sendToBroker(payloads: any, encoder: any, decoder: any, cb: any): any;
        setupBroker(host: any, port: any, longpolling: any, brokers: any): any;
        setupBrokerProfiles(brokers: any): any;
        topicExists(topics: Array<string>, callback: (error: any) => any): void;
        unqueueCallback(socket: any, id: any): any;
        updateMetadatas(metadatas: any): any;
    }

    class KafkaClient extends EventEmitter {
        constructor(connectionString: string, clientId: string, zkOptions?: ZKOptions, noAckBatchOptions?: any, sslOptions?: any);
        addTopics(topics: Array<string>, cb: (error: any, topics: Array<string>) => any): any;
        brokerForLeader(leader: any, longpolling: any): any;
        checkMetadatas(payloads: any): any;
        clearCallbackQueue(socket: any, error: any): void;
        close(callback?: Function): void;
        closeBrokers(brokers: any): void;
        connect(): any;
        createBroker(host: any, port: any, longpolling: any): any;
        createTopics(topics: any, isAsync: any, cb: Function): any;
        getBrokers(longpolling: any): any;
        handleReceivedData(socket: any): void;
        hasMetadata(topic: any, partition: any): any;
        leaderByPartition(topic: any, partition: any): any;
        loadMetadataForTopics(topics: any, cb: any): any;
        nextId(): any;
        nextSocketId(): any;
        payloadsByLeader(payloads: any): any;
        queueCallback(socket: any, id: any, data: any): void;
        reconnectBroker(oldSocket: any): void;
        refreshBrokers(): any;
        refreshMetadata(topics: Array<string>, cb?: (error: any, data: any) => any): void;
        removeTopicMetadata(topics: any, cb: any): void;
        send(payloads: any, encoder: any, decoder: any, cb: any): any;
        sendFetchRequest(consumer: any, payloads: any, fetchMaxWaitMs: any, fetchMinBytes: any, maxTickMessages: any, ...args: any[]): any;
        sendGroupCoordinatorRequest(groupId: any, cb: any, ...args: any[]): void;
        sendGroupRequest(encode: any, decode: any, requestArgs: any): any;
        sendHeartbeatRequest(groupId: any, generationId: any, memberId: any, cb: any, ...args: any[]): void;
        sendJoinGroupRequest(groupId: any, memberId: any, sessionTimeout: any, groupProtocol: any, cb: any, ...args: any[]): void;
        sendLeaveGroupRequest(groupId: any, memberId: any, cb: any, ...args: any[]): void;
        sendOffsetCommitRequest(group: any, payloads: any, cb: any): void;
        sendOffsetCommitV2Request(group: any, generationId: any, memberId: any, payloads: any, cb: any, ...args: any[]): void;
        sendOffsetFetchRequest(group: any, payloads: any, cb: any): void;
        sendOffsetFetchV1Request(group: any, payloads: any, cb: any, ...args: any[]): void;
        sendOffsetRequest(payloads: any, cb: any): void;
        sendProduceRequest(payloads: any, requireAcks: any, ackTimeoutMs: any, cb: any): any;
        sendSyncGroupRequest(groupId: any, generationId: any, memberId: any, groupAssignment: any, cb: any, ...args: any[]): void;
        sendToBroker(payloads: any, encoder: any, decoder: any, cb: any): any;
        setupBroker(host: any, port: any, longpolling: any, brokers: any): any;
        setupBrokerProfiles(brokers: any): any;
        topicExists(topics: Array<string>, callback: (error: any) => any): void;
        unqueueCallback(socket: any, id: any): any;
        updateMetadatas(metadatas: any): any;
    }

    class Consumer extends EventEmitter {
        constructor(client: Client, topics: Array<Topic>, options: ConsumerOptions);
        addTopics(topics: Array<Topic>, cb: (error: any, added: boolean) => any, fromOffset: boolean): void;
        autoCommit(force: boolean, cb: (error: any, msg: string) => any): void;
        buildPayloads(payloads: Array<Topic | string>): Array<Topic>;
        close(force: boolean, cb: (error?: any) => any): void;
        commit(force: boolean, cb: (error: any, msg: string) => any): void;
        connect(): void;
        fetch(): void;
        fetchOffset(payloads: Array<Topic>, cb: (error?: any) => any): void;
        init(): void;
        pause(): void;
        pauseTopics(topics: Array<Topic | string>): void;
        removeTopics(topics: Array<Topic | string>, cb: (error: any, topicsLength: number) => any): void;
        resume(): void;
        pauseTopics(topics: Array<Topic | string>): void;
        setOffset(topic: string, partition: number, offset: number): void;
        updateOffsets(topics: Array<string>, initing: boolean): void;
    }

    class HighLevelConsumer extends EventEmitter {
        constructor(client: Client, topics: Array<Topic>, options: HighLevelConsumerOptions);
        addTopics(topics: any, cb: any): any;
        autoCommit(force: any, cb: any, ...args: any[]): any;
        buildPayloads(payloads: any): any;
        buildTopicPayloads(topics: any): any;
        close(force: any, cb: any): void;
        commit(force: any, cb: any, ...args: any[]): any;
        connect(): any;
        fetch(): void;
        fetchOffset(payloads: any, cb: any): void;
        getTopicPayloads(): any;
        init(): any;
        leaveGroup(cb: any): void;
        offsetRequest(payloads: any, cb: any): void;
        pause(): void;
        rebalanceAttempt(oldTopicPayloads: any, cb: any): void;
        registerConsumer(cb: any): any;
        removeTopics(topics: any, cb: any): any;
        resume(): void;
        sendOffsetCommitRequest(commits: any, cb: any): void;
        setOffset(topic: any, partition: any, offset: any): any;
        stop(cb: any): any;
        updateOffsets(topics: any, initing: any): void;
    }

    class ConsumerGroup extends HighLevelConsumer {
        topicPayloads: Array<Topic>;
        constructor(memberOptions: any, topics: any);
        assignPartitions(protocol: any, groupMembers: any, callback: any): void;
        close(force: any, cb: any): void;
        connect(): any;
        fetchOffset(payloads: any, cb: any): void;
        getDefaultOffset(tp: any, defaultOffset: any): any;
        getOffset(): any;
        handleJoinGroup(joinGroupResponse: any, callback: any): any;
        handleSyncGroup(syncGroupResponse: any, callback: any): any;
        leaveGroup(callback: any): void;
        saveDefaultOffsets(topicPartitionList: any, callback: any): any;
        scheduleReconnect(timeout: any): void;
        sendHeartbeat(): any;
        sendOffsetCommitRequest(commits: any, cb: any): void;
        setCoordinatorId(coordinatorId: any): void;
        setupProtocols(protocols: any): any;
        startHeartbeats(): void;
        stopHeartbeats(): void;
    }

    class Producer extends EventEmitter {
        constructor(client: Client, options?: any, customPartitioner?: any);
        connect(): void;
        send(payloads: Array<ProduceRequest>, cb: (error: any, data: any) => any): void;
        buildPayloads(payloads: any, topicMetadata: any): any;
        createTopics(topics: Array<string>, async: boolean, cb?: (error: any, data: any) => any): void;
        close(cb: (error: any) => any): void;
    }

    class HighLevelProducer extends EventEmitter {
        constructor(client: Client, options?: any, customPartitioner?: any);
        connect(): void;
        send(payloads: Array<ProduceRequest>, cb: (error: any, data: any) => any): void;
        buildPayloads(payloads: any, topicMetadata: any): any;
        createTopics(topics: Array<string>, async: boolean, cb?: (error: any, data: any) => any): void;
        close(cb: (error: any) => any): void;
    }

    class Offset {
        constructor(client: Client);
        on(eventName: string, cb: () => any): void;
        fetch(payloads: Array<OffsetRequest>, cb: (error: any, data: any) => any): void;
        commit(groupId: string, payloads: Array<OffsetCommitRequest>, cb: (error: any, data: any) => any): void;
        fetchCommits(groupId: string, payloads: Array<OffsetFetchRequest>, cb: (error: any, data: any) => any): void;
        fetchLatestOffsets(topics: Array<string>, cb: (error: any, data: any) => any): void;
        fetchEarliestOffsets(topics: Array<string>, cb: (error: any, data: any) => any): void;
        on(eventName: string, cb: (error: any) => any): void;
    }

    class KeyedMessage {
        constructor(key: string, message: string);
    }

    // # Interfaces
    interface AckBatchOptions {
        noAckBatchSize: number | null,
        noAckBatchAge: number | null
    }

    interface ZKOptions {
        sessionTimeout?: number;
        spinDelay?: number;
        retries?: number;
    }

    interface ProduceRequest {
        topic: string;
        messages: any; // Array<string> | Array<KeyedMessage> | string | KeyedMessage
        key?: any;
        partition?: number;
        attributes?: number;
    }

    interface ConsumerOptions {
        groupId?: string;
        autoCommit?: boolean;
        autoCommitIntervalMs?: number;
        fetchMaxWaitMs?: number;
        fetchMinBytes?: number;
        fetchMaxBytes?: number;
        fromOffset?: boolean;
        encoding?: string;
    }

    interface HighLevelConsumerOptions {
        groupId: string;
        autoCommit: boolean;
        autoCommitIntervalMs: number;
        fetchMaxWaitMs: number;
        paused: boolean;
        maxNumSegments: number;
        fetchMinBytes: number;
        fetchMaxBytes: number;
        maxTickMessages: number;
        fromOffset: boolean;
        rebalanceRetry: {
            retries: number;
            factor: number;
            minTimeout: number;
            maxTimeout: number;
            randomize: boolean;
        }
    }

    interface CustomPartitionAssignmentProtocol {
        name: string;
        version: number;
        userData: {};
        assign: (topicPattern: any, groupMembers: any, callback: (error: any, result: any) => void) => void;
    }

    interface ConsumerGroupOptions {
        kafkaHost?: string;
        host?: string;
        id?: string;
        zk?: ZKOptions;
        batch?: { noAckBatchSize: number; noAckBatchAge: number };
        ssl?: boolean;
        groupId?: string;
        autoCommit?: boolean;
        autoCommitIntervalMs?: number;
        fetchMaxWaitMs?: number;
        paused?: boolean;
        maxNumSegments?: number;
        fetchMinBytes?: number;
        fetchMaxBytes?: number;
        maxTickMessages?: number;
        fromOffset?: string;
        outOfRangeOffset?: string;
        sessionTimeout?: number;
        retries?: number;
        retryFactor?: number;
        retryMinTimeout?: number;
        connectOnReady?: boolean;
        migrateHLC?: boolean;
        migrateRolling?: boolean;
        protocol?: string[];
    }

    interface Topic {
        topic: string;
        partition?: number;
        offset?: number;
        maxBytes?: number;
        metadata?: string;
    }

    interface OffsetRequest {
        topic: string;
        partition?: number;
        time?: number;
        maxNum?: number;
    }

    interface OffsetCommitRequest {
        topic: string;
        partition?: number;
        offset: number;
        metadata?: string;
    }

    interface OffsetFetchRequest {
        topic: string;
        partition?: number;
        offset?: number;
    }
}