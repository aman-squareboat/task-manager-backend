"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dispatch = exports.Queue = void 0;
const core_1 = require("./core");
const metadata_1 = require("./metadata");
const service_1 = require("./service");
class Queue {
    static async dispatch(message) {
        const job = metadata_1.QueueMetadata.getJob(message.job);
        const payload = core_1.PayloadBuilder.build(message, (job === null || job === void 0 ? void 0 : job.options) || {});
        const connection = service_1.QueueService.getConnection(payload['connection']);
        return connection.push(JSON.stringify(payload), payload);
    }
}
exports.Queue = Queue;
function Dispatch(message) {
    const job = metadata_1.QueueMetadata.getJob(message.job);
    const payload = core_1.PayloadBuilder.build(message, (job === null || job === void 0 ? void 0 : job.options) || {});
    const connection = service_1.QueueService.getConnection(payload.connection);
    return connection.push(JSON.stringify(payload), payload);
}
exports.Dispatch = Dispatch;
//# sourceMappingURL=queue.js.map