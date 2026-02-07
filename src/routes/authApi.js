import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'
import { tasksQ } from '../queue.js'
import validarUsuario from '../middleware/authValidationMiddleware.js'
import validarLogin from '../middleware/authLoginMiddleware.js'
import Usuario from '../models/usuario.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints de autenticação
 */

/**
 * @swagger
 * /auth/registrar:
 *   post:
 *     summary: Registra o usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               sobrenome:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registro bem-sucedido
 *       401:
 *         description: Email já cadastrado
 *       500:
 *         description: Erro interno do servidor
 * /auth/logar:
 *   post:
 *     summary: Faz login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       401:
 *         description: Credenciais inválidas
 *       404:
 *         description: Email não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

router.post('/registrar', validarUsuario, async (req, res) => {

    const { nome, sobrenome, email, telefone, senha } = req.body

    const senhaHashed = bcrypt.hashSync(senha, 8)

    try {

        // MONGODB

        const emailExiste = await Usuario.findOne({
            email: email
        })

        if (emailExiste) {
            return res.status(400).json({
                success: false,
                message: "Email já cadastrado."
            })
        }

        const user = await Usuario.create({
            ...req.body,
            senha: senhaHashed
        })

        // MONGODB

        // PRISMA SQL

        // const user = await prisma.user.create({
        //     data: {
        //         ...req.body,
        //         senha: senhaHashed
        //     }
        // })

        // PRISMA SQL

        await tasksQ.add('taskMail', user).catch(err => console.log(err))

        return res.status(201).json({
            success: true,
            message: "Usuário registrado com sucesso"
        })

    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({
                success: false,
                message: "Email já cadastrado."
            })
        }
        return res.status(500).json({
            success: false,
            message: "Erro ao registrar usuário."
        })
    }
})

router.post('/logar', validarLogin, async (req, res) => {
    const { email, senha } = req.body

    try {

        // MONGODB

        const user = await Usuario.findOne({
            email: email
        })

        // MONGODB

        // PRISMA SQL

        // const user = await prisma.user.findUnique({
        //     where: {
        //         email: email
        //     }
        // })

        // PRISMA SQL

        const senhaValida = bcrypt.compareSync(senha, user.senha)

        if (!senhaValida) {
            return res.status(401).send({ message: "Senha inválida" })
        }

        const token = jwt.sign({
            // id: user.id, // PRISMA SQL
            id: user._id, // MONGODB
            nome: user.nome,
            sobrenome: user.sobrenome,
            email: user.email,
            telefone: user.telefone
        },
            process.env.JWT_SECRET, { expiresIn: '12h' })

        res.json(`Bearer ${token}`)

    } catch (error) {
        if (error.message === "Cannot read properties of null (reading 'senha')") {
            return res.status(404).json({
                success: false,
                message: "Email não encontrado."
            })
        }
        return res.status(500).json({
            success: false,
            message: "Erro ao logar usuário."
        })
    }
})

export default router