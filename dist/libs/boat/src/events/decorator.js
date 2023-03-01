"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListensTo = exports.Event = void 0;
require("reflect-metadata");
const constants_1 = require("../constants");
function Event(name) {
    return function (target) {
        Reflect.defineMetadata(constants_1.BoatConstants.eventEmitterName, name || target['name'], target);
    };
}
exports.Event = Event;
function ListensTo(event) {
    const eventName = typeof event === 'string' ? event : event['name'];
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata(constants_1.BoatConstants.eventName, eventName, target, propertyKey);
    };
}
exports.ListensTo = ListensTo;
//# sourceMappingURL=decorator.js.map