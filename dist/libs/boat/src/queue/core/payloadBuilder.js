"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayloadBuilder = void 0;
const metadata_1 = require("../metadata");
class PayloadBuilder {
    static build(message, jobOptions) {
        const defaultOptions = metadata_1.QueueMetadata.getDefaultOptions();
        const payload = Object.assign(Object.assign(Object.assign(Object.assign({ attemptCount: 0 }, defaultOptions), { queue: undefined }), jobOptions), message);
        payload.connection = payload.connection || defaultOptions.connection;
        if (!payload.queue) {
            const config = metadata_1.QueueMetadata.getData();
            payload.queue =
                payload.connection != undefined
                    ? config.connections[payload.connection].queue
                    : undefined;
        }
        return payload;
    }
}
exports.PayloadBuilder = PayloadBuilder;
//# sourceMappingURL=payloadBuilder.js.map