import {Request, Response, NextFunction} from 'express'
import redis from 'redis'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import AppError from '@shared/errors/AppError'

const redisClient = redis.createClient({
    legacyMode: true,
    password: process.env.REDIS_PASS || undefined,
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
});

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
