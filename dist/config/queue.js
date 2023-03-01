"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nest_queue_redis_1 = require("@squareboat/nest-queue-redis");
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('queue', () => {
    return {
        default: 'notification',
        connections: {
            notification: {
                driver: nest_queue_redis_1.RedisQueueDriver,
                host: process.env.REDIS_HOST || '127.0.0.1',
                port: +process.env.REDIS_PORT || 6379,
                database: +process.env.REDIS_DB || 0,
                queue: 'tm-queue',
            },
        },
    };
});
//# sourceMappingURL=queue.js.map