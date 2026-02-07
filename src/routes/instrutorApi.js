import express from 'express'
import prisma from '../prismaClient.js'
import validarInstrutor from '../middleware/instrutorValidationMiddleware.js'
import Instrutor from "../models/instrutor.js"

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Instrutor
 *   description: Endpoints do instrutor
 */

/**
 * @swagger
 * /api/instrutores:
 *   get:
 *     summary: Retorna todos os instrutores
 *     tags: [Instrutor]
 *     responses:
 *       200:
 *         description: Sucesso ao buscar instrutores
 *       500:
 *         description: Erro interno do servidor
 * 
 * /api/instrutor:
 *   post:
 *     summary: Cadastra um novo instrutor
 *     tags: [Instrutor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               dia:
 *                 type: string
 *                 example: "10/10/2010"
 *               horario:
 *                 type: string
 *                 example: "10:00"
 *     responses:
 *       201:
 *         description: Sucesso ao cadastrar instrutor
 *       500:
 *         description: Erro interno do servidor
 * 
 * /api/instrutor/{id}:
 *   delete:
 *     summary: Deleta um instrutor pelo ID
 *     tags: [Instrutor]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          description: ID do instrutor a ser deletado
 *     responses:
 *       200:
 *         description: Instrutor deletado com sucesso
 *       404:
 *         description: Instrutor não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

router.get('/instrutores', async (req, res) => {

    //* PRISMA SQL

    // const instrutores = await prisma.instrutor.findMany({})

    //* PRISMA SQL

    //* MONGODB

    const instrutores = await Instrutor.find({})

    //* MONGODB

    const instrutoresFormatado = instrutores.map(item => ({
        // id: item.id, // PRISMA SQL
        _id: item._id, // MONGODB
        nome: item.nome,
        dia: item.dia,
        horario: item.horario
    }))

    return res.json({
        success: true,
        data: instrutoresFormatado
    })
})

router.get('/instrutor/:dia', async (req, res) => {

    try {

        const dia = req.params.dia

        //* PRISMA SQL

        // const instrutor = await prisma.$queryRaw
        //     `
        // SELECT * FROM Instrutor 
        // WHERE EXISTS (
        //     SELECT 1 FROM json_each(Instrutor.dia) 
        //     WHERE value = ${dia})
        // `

        //* PRISMA SQL

        //* MONGODB

        const instrutor = await Instrutor.find({
            dia: dia
        })

        //* MONGODB

        if (instrutor.length < 1) {
            return res.status(404).json({
                success: false,
                message: "Nenhum instrutor disponível para esse dia."
            })
        }

        const instrutorFormatado = instrutor.map(item => ({
            // id: item.id, // PRISMA SQL
            _id: item._id, // MONGODB
            nome: item.nome,
            dia: item.dia,
            horario: item.horario,
        }))

        res.json({
            success: true,
            data: instrutorFormatado
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Erro ao buscar instrutor."
        })
    }
})

router.post('/instrutor', validarInstrutor, async (req, res) => {

    const { nome, dia, horario } = req.body

    const instrutorFormatado = {
        ...req.body,
    }

    try {

        //* MONGODB

        const instrutorCriado = await Instrutor.create(instrutorFormatado)

        //* MONGODB

        //* PRISMA SQL

        // const instrutorCriado = await prisma.instrutor.create({
        //     data: instrutorFormatado
        // })

        //* PRISMA SQL

        return res.status(201).json({
            success: true,
            data: instrutorCriado
        })

    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({
                success: false,
                message: `Instrutor ${req.body.nome} já cadastrado.`
            })
        }
        if (error.code === 11000) { //* MONGODB
            return res.status(400).json({
                success: false,
                message: `Instrutor ${req.body.nome} já cadastrado.`
            })
        }
        return res.status(500).json({
            success: false,
            message: "Erro ao cadastrar instrutor."
        })
    }
})

router.delete('/instrutor/:id', async (req, res) => {

    const { id } = req.params

    try {

        //* PRISMA SQL

        // await prisma.instrutor.delete({
        //     where: {
        //         id: +id,
        //     }
        // })

        //* PRISMA SQL

        //* MONGODB

        const instrutorDeletado = await Instrutor.findByIdAndDelete(id)

        //* MONGODB

        if (!instrutorDeletado) {
            return res.status(404).json({
                success: false,
                message: "Instrutor não encontrado."
            })
        }

        return res.json({
            success: true,
            message: "Instrutor deletado."
        })

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                success: false,
                message: "Instrutor não encontrado."
            })
        }
        return res.status(500).json({
            success: false,
            message: "Erro ao deletar instrutor."

        })
    }
})

export default router