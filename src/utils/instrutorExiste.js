import prisma from '../prismaClient.js'

async function instrutorExiste(id, dia) {
    const instrutor = await prisma.$queryRaw
    `
    SELECT * FROM Instrutor 
    WHERE EXISTS (
        SELECT 1 FROM json_each(Instrutor.dia) 
        WHERE value = ${dia})
    `

    return instrutor
}

export default instrutorExiste