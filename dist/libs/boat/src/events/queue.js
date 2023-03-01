"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventQueueWorker = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
const queue_1 = require("../queue");
const runner_1 = require("./runner");
let EventQueueWorker = class EventQueueWorker {
    async handle(data) {
        const { eventName, eventData } = data;
        const runner = new runner_1.EventListenerRunner();
        await runner.handle(eventName, eventData);
    }
};
__decorate([
    (0, queue_1.Job)(constants_1.BoatConstants.eventJobName),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventQueueWorker.prototype, "handle", null);
EventQueueWorker = __decorate([
    (0, common_1.Injectable)()
], EventQueueWorker);
exports.EventQueueWorker = EventQueueWorker;
//# sourceMappingURL=queue.js.map