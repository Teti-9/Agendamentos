import prisma from '../prismaClient.js'
import Instrutor from '../models/instrutor.js'

async function instrutorExiste(id, dia, horario) {

    //* PRISMA SQL

    // const instrutor = await prisma.$queryRaw
    //     `
    // SELECT * FROM Instrutor 
    // WHERE EXISTS (
    //     SELECT 1 FROM json_each(Instrutor.dia) 
    //     WHERE value = ${dia})
    // `

    // return instrutor

    //* PRISMA SQL

    //* MONGODB

    const instrutor = await Instrutor.findOne({
        _id: id,
        dia: dia,
        horario: horario
    })

    return instrutor

    //* MONGODB

}

export default instrutorExiste