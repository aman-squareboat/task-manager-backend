"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRunner = void 0;
const metadata_1 = require("./metadata");
const queue_1 = require("./queue");
class JobRunner {
    constructor(options, connection) {
        this.options = options;
        this.connection = connection;
    }
    async run(job) {
        const message = this.fetchMessage(job);
        const { data } = message;
        try {
            const targetJob = metadata_1.QueueMetadata.getJob(message.job);
            if (!targetJob || !targetJob.target)
                return;
            await targetJob.target(data);
            await this.success(message, job);
        }
        catch (e) {
            console.log('e => ', e);
            await this.retry(message, job);
        }
    }
    async success(message, job) {
        await this.removeJobFromQueue(job);
    }
    async retry(message, job) {
        this.removeJobFromQueue(job);
        await this.removeJobFromQueue(job);
        message.attemptCount += 1;
        if (message.attemptCount === message.tries)
            return;
        (0, queue_1.Dispatch)(message);
    }
    async removeJobFromQueue(job) {
        await this.connection.remove(job, this.options);
    }
    fetchMessage(job) {
        return JSON.parse(job.getMessage());
    }
}
exports.JobRunner = JobRunner;
//# sourceMappingURL=jobrunner.js.map