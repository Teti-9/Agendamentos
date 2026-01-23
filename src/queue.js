import { Queue } from 'bullmq'
import redisConfig from './config/redis.js'

export const tasksQ = new Queue('tasks', {
    connection: redisConfig.redis
})