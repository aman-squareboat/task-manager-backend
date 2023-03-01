"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqsQueueDriver = exports.SqsJob = void 0;
const AWS = require("aws-sdk");
const nest_queue_strategy_1 = require("@squareboat/nest-queue-strategy");
class SqsJob extends nest_queue_strategy_1.DriverJob {
    getMessage() {
        return this.data.Body;
    }
}
exports.SqsJob = SqsJob;
class SqsQueueDriver {
    constructor(options) {
        this.options = options;
        const awsOptions = { region: options.region };
        if (options.profile) {
            options['credentials'] = new AWS.SharedIniFileCredentials({
                profile: options.profile,
            });
        }
        this.client = new AWS.SQS(Object.assign({}, awsOptions));
        this.queueUrl = options.prefix + '/' + options.queue;
    }
    async push(message, rawPayload) {
        const params = {
            DelaySeconds: rawPayload.delay,
            MessageBody: message,
            QueueUrl: this.options.prefix + '/' + rawPayload.queue,
        };
        await this.client.sendMessage(params).promise().then();
        return;
    }
    async pull(options) {
        const params = {
            MaxNumberOfMessages: 1,
            MessageAttributeNames: ['All'],
            QueueUrl: this.options.prefix + '/' + options.queue,
            VisibilityTimeout: 30,
            WaitTimeSeconds: 20,
        };
        const response = await this.client.receiveMessage(params).promise();
        const message = response.Messages ? response.Messages[0] : null;
        return message ? new SqsJob(message) : null;
    }
    async remove(job, options) {
        const params = {
            QueueUrl: this.options.prefix + '/' + options.queue,
            ReceiptHandle: job.data.ReceiptHandle,
        };
        await this.client.deleteMessage(params).promise();
        return;
    }
    async purge(options) {
        const params = {
            QueueUrl: this.options.prefix + '/' + options.queue,
        };
        await this.client.purgeQueue(params).promise();
        return;
    }
    async count(options) {
        const params = {
            QueueUrl: this.options.prefix + '/' + options.queue,
            AttributeNames: ['ApproximateNumberOfMessages'],
        };
        const response = await this.client
            .getQueueAttributes(params)
            .promise();
        return +response.Attributes.ApproximateNumberOfMessages;
    }
}
exports.SqsQueueDriver = SqsQueueDriver;
//# sourceMappingURL=sqs.js.map