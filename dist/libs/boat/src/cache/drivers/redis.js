"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisDriver = void 0;
const boat_1 = require("../..");
class RedisDriver {
    constructor(options) {
        this.options = options;
        const IORedis = boat_1.Package.load('ioredis');
        this.client = new IORedis({
            host: options.host,
            port: options.port,
            password: options.password,
            db: options.database,
        });
        this.ignoreKeyPrefix = false;
        this.cacheTags = [];
    }
    async keys(prefix) {
        return this.client.keys(prefix);
    }
    async get(key) {
        const value = await this.client.get(this.storeKey(key));
        if (!value)
            return null;
        try {
            return JSON.parse(value);
        }
        catch (e) {
            return value;
        }
    }
    async set(key, value, ttlInSec) {
        const redisKey = this.storeKey(key);
        if (ttlInSec) {
            await this.client.set(redisKey, JSON.stringify(value), 'EX', ttlInSec);
        }
        await this.client.set(redisKey, JSON.stringify(value));
        await this.syncTags(redisKey);
        this.cacheTags = [];
    }
    async syncTags(redisKey) {
        const key = `${redisKey}:::tagged-data`;
        const previousTags = await this.client.smembers(key);
        const toBeDeletedTags = [];
        for (const tag of previousTags) {
            if (!this.cacheTags.includes(tag)) {
                toBeDeletedTags.push(tag);
            }
        }
        if (toBeDeletedTags.length == 0)
            return;
        if (toBeDeletedTags) {
            const promises = [];
            for (const tag of toBeDeletedTags) {
                promises.push(this.client.srem(`tag:::${tag}`, redisKey));
            }
            promises.length && (await Promise.all(promises));
        }
        await this.client.del(key);
        if (this.cacheTags.length) {
            const promises = [];
            promises.push(this.client.sadd(key, this.cacheTags));
            for (const tag of this.cacheTags) {
                promises.push(this.client.sadd(`tag:::${tag}`, redisKey));
            }
            promises.length && (await Promise.all(promises));
        }
    }
    async has(key) {
        const num = await this.client.exists(this.storeKey(key));
        return !!num;
    }
    async remember(key, cb, ttlInSec) {
        if (await this.has(key))
            return this.get(key);
        const response = await cb();
        await this.set(key, response, ttlInSec);
        return response;
    }
    async rememberForever(key, cb) {
        if (await this.has(key))
            return this.get(key);
        const response = await cb();
        await this.set(key, response);
        return response;
    }
    async forget(key) {
        if (this.cacheTags.length === 0 && !key) {
            throw new Error('You need to send key if you are not passing tags');
        }
        await this.client.del(this.storeKey(key));
    }
    storeKey(key) {
        return this.ignoreKeyPrefix ? key : `${this.options.prefix}:::${key}`;
    }
    getClient() {
        return this.client;
    }
    tags(...keys) {
        this.cacheTags = keys;
        return this;
    }
    ignorePrefix() {
        this.ignoreKeyPrefix = true;
        return this;
    }
}
exports.RedisDriver = RedisDriver;
//# sourceMappingURL=redis.js.map