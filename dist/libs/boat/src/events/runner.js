"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventListenerRunner = void 0;
const helpers_1 = require("./helpers");
const metadata_1 = require("./metadata");
class EventListenerRunner {
    async handle(eventName, eventData) {
        const promises = [];
        const listeners = metadata_1.EventMetadata.getListeners(eventName);
        if ((0, helpers_1.isEmpty)(listeners))
            return;
        for (const listener of listeners) {
            promises.push(listener(eventData));
        }
        return Promise.all(promises);
    }
}
exports.EventListenerRunner = EventListenerRunner;
//# sourceMappingURL=runner.js.map