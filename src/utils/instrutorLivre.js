import prisma from '../prismaClient.js'

async function instrutorLivre(instrutorId, date, horario) {
    const agendamento = await prisma.agendamento.findMany({
        where: {
            instrutorId: instrutorId,
            dia: date,
            horario: horario,
        }
    })

    return agendamento
}

export default instrutorLivre