import { Worker } from 'bullmq'
import { mailJob } from '../jobs/mailJob.js'
import { agendamentoJob } from '../jobs/agendamentoJob.js'
import redisConfig from '../config/redis.js'

new Worker('tasks', async job => {
    console.log('📧 Trabalhando...')

    switch (job.name) {
        case 'taskMail':
            return mailJob.handle(job.data)

        case 'taskAgendamento':
            return agendamentoJob.handle(job.data, job.data.status)

    }

}, 
{ connection: redisConfig.redis }
)

console.log('🚀 Worker iniciado!')