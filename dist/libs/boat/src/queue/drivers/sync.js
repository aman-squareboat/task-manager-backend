"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncQueueDriver = void 0;
const metadata_1 = require("../metadata");
class SyncQueueDriver {
    async push(message, rawPayload) {
        const job = metadata_1.QueueMetadata.getJob(rawPayload.job);
        job.target(rawPayload.data);
        return;
    }
    async pull(options) {
        return null;
    }
    async remove(job, options) {
        return;
    }
    async purge(options) {
        return;
    }
    async count(options) {
        return 0;
    }
}
exports.SyncQueueDriver = SyncQueueDriver;
//# sourceMappingURL=sync.js.map