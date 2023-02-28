import { RedisQueueDriver } from '@squareboat/nest-queue-redis';
import { registerAs } from '@nestjs/config';
import { QueueOptions } from '@libs/boat/queue';

export default registerAs('queue', () => {
  return {
    default: 'notification',
    connections: {
      notification: {
        driver: RedisQueueDriver,
        host: process.env.REDIS_HOST || '127.0.0.1',
        port: +process.env.REDIS_PORT || 6379,
        database: +process.env.REDIS_DB || 0,
        queue: 'tm-queue',
      },
    },
  } as QueueOptions;
});
