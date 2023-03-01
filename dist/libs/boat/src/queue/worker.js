"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueWorker = void 0;
const metadata_1 = require("./metadata");
const service_1 = require("./service");
const jobrunner_1 = require("./jobrunner");
class QueueWorker {
    constructor(options) {
        const defaultOptions = metadata_1.QueueMetadata.getDefaultOptions();
        this.options = options || {};
        this.options = Object.assign(Object.assign(Object.assign({}, defaultOptions), { schedulerInterval: 5000, queue: undefined }), this.options);
        if (!this.options.queue) {
            const data = metadata_1.QueueMetadata.getData();
            this.options['queue'] = data.connections[this.options.connection || defaultOptions.connection].queue;
        }
    }
    static init(options) {
        return new QueueWorker(options);
    }
    async poll(connection) {
        const job = await connection.pull({ queue: this.options.queue });
        return job;
    }
    async listen() {
        const connection = service_1.QueueService.getConnection(this.options.connection);
        if (connection.scheduledTask) {
            await this.performScheduledTask(connection);
        }
        const runner = new jobrunner_1.JobRunner(this.options, connection);
        while (1) {
            const job = await this.poll(connection);
            if (job) {
                await runner.run(job);
            }
            else {
                await new Promise((resolve) => setTimeout(resolve, this.options.sleep * 1000));
            }
        }
    }
    async performScheduledTask(connection) {
        if (!connection || !connection.scheduledTask)
            return;
        setInterval(async () => connection.scheduledTask
            ? await connection.scheduledTask(this.options)
            : null, this.options.schedulerInterval || 10000);
    }
    async purge() {
        const connection = service_1.QueueService.getConnection(this.options.connection);
        await connection.purge({ queue: this.options.queue });
        return;
    }
    async count() {
        const connection = service_1.QueueService.getConnection(this.options.connection);
        return await connection.count({ queue: this.options.queue });
    }
}
exports.QueueWorker = QueueWorker;
//# sourceMappingURL=worker.js.map