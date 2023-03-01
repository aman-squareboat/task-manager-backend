"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventMetadata = void 0;
class EventMetadata {
    static addListener(event, target) {
        const listeners = EventMetadata.store.listeners[event] || [];
        listeners.push(target);
        EventMetadata.store.listeners[event] = listeners;
    }
    static getListeners(event) {
        const listeners = EventMetadata.store.listeners[event];
        return listeners || [];
    }
}
exports.EventMetadata = EventMetadata;
EventMetadata.store = { events: {}, listeners: {} };
//# sourceMappingURL=metadata.js.map