"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnJobProcessed = exports.OnJobProcessing = exports.OnJobFailed = exports.Job = void 0;
require("reflect-metadata");
const constants_1 = require("../constants");
const events_1 = require("../events");
function Job(job, options) {
    options = options || {};
    return function (target, propertyKey) {
        Reflect.defineMetadata(constants_1.BoatConstants.queueJobName, job, target, propertyKey);
        Reflect.defineMetadata(constants_1.BoatConstants.queueOptions, options, target, propertyKey);
    };
}
exports.Job = Job;
function OnJobFailed() {
    return function (target, propertyKey, descriptor) {
        (0, events_1.ListensTo)(constants_1.BoatEvents.jobFailed)(target, propertyKey, descriptor);
    };
}
exports.OnJobFailed = OnJobFailed;
function OnJobProcessing() {
    return function (target, propertyKey, descriptor) {
        (0, events_1.ListensTo)(constants_1.BoatEvents.jobProcessing)(target, propertyKey, descriptor);
    };
}
exports.OnJobProcessing = OnJobProcessing;
function OnJobProcessed() {
    return function (target, propertyKey, descriptor) {
        (0, events_1.ListensTo)(constants_1.BoatEvents.jobProcessed)(target, propertyKey, descriptor);
    };
}
exports.OnJobProcessed = OnJobProcessed;
//# sourceMappingURL=decorators.js.map