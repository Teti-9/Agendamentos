import prisma from '../prismaClient.js'
import Agendamento from '../models/agendamento.js'

async function instrutorLivre(id, dia, horario) {

    //* PRISMA SQL

    // const agendamento = await prisma.agendamento.findMany({
    //     where: {
    //         instrutorId: id,
    //         dia: dia,
    //         horario: horario,
    //     }
    // })

    // return agendamento

    //* PRISMA SQL

    //* MONGODB

    const agendamento = await Agendamento.findOne({
        instrutor: id,
        dia: dia,
        horario: horario
    })

    return agendamento

    //* MONGODB

}

export default instrutorLivre