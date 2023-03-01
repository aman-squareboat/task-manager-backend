"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmitsEvent = void 0;
const lodash_1 = require("lodash");
require("reflect-metadata");
const constants_1 = require("../constants");
const queue_1 = require("../queue");
const runner_1 = require("./runner");
class EmitsEvent {
    constructor() {
        this.reservedKeyNames = [
            'fetchPayload',
            'emit',
            'reservedKeyNames',
            'dispatch',
        ];
    }
    async emit() {
        const eventName = Reflect.getMetadata(constants_1.BoatConstants.eventEmitterName, this.constructor);
        const shouldBeQueued = this['queueOptions'];
        if (!shouldBeQueued) {
            const runner = new runner_1.EventListenerRunner();
            await runner.handle(eventName, this.fetchPayload());
            return;
        }
        const queueConnection = shouldBeQueued();
        await this.dispatch(eventName, queueConnection);
    }
    fetchPayload() {
        const payloadKeys = (0, lodash_1.difference)(Object.getOwnPropertyNames(this), this.reservedKeyNames);
        const payload = {};
        for (const key of payloadKeys) {
            payload[key] = this[key];
        }
        return payload;
    }
    async dispatch(eventName, queueConnection) {
        const totalJobOptions = Array.isArray(queueConnection)
            ? queueConnection
            : [queueConnection];
        const eventData = this.fetchPayload();
        for (const option of totalJobOptions) {
            await (0, queue_1.Dispatch)(Object.assign({ job: constants_1.BoatConstants.eventJobName, data: { eventName, eventData, discriminator: 'boatjs_generated_job' } }, (option || {})));
        }
    }
}
exports.EmitsEvent = EmitsEvent;
//# sourceMappingURL=event.js.map