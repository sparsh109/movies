const Redis = require("ioredis");
const { Logger } = require('../helper');
const config = require('./Config')

const RedisConnection = () => {
    try {
        return new Redis(
            config.REDIS.PORT,
            config.REDIS.HOST,
        )
    } catch (error) {
        Logger.error(`Redis connection error: ${error}`)
        return null
    }
}

module.exports = RedisConnection
