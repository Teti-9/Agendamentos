import { Queue } from 'bullmq'
import redisConfig from '../config/redis.js'

async function clearQueue() {
    const queue = new Queue('tasks', { connection: redisConfig.redis })

    try {
        console.log('🧹 Limpando queue...')

        const counts = await queue.getJobCounts()
        console.log('Jobs antes:', counts)

        await queue.obliterate({ force: true })

        const countsAfter = await queue.getJobCounts()
        console.log('Jobs depois:', countsAfter)

        console.log('✅ Queue limpa com sucesso!')
        process.exit(0)
    } catch (error) {
        console.error('❌ Erro ao limpar queue:', error)
        process.exit(1)
    }
}

clearQueue()