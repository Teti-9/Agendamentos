import express from 'express'
import prisma from '../prismaClient.js'
import instrutorExiste from '../utils/instrutorExiste.js'
import instrutorLivre from '../utils/instrutorLivre.js'
import validarAgendamento from '../middleware/agendamentoValidationMiddleware.js'
import { tasksQ } from '../queue.js'

const router = express.Router()

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: JWT String para autenticação
 */

/**
 * @swagger
 * tags:
 *   name: Agendamento
 *   description: Endpoints do agendamento
 */

/**
 * @swagger
 * /api/agendamentos:
 *   get:
 *     summary: Retorna todos os agendamentos do usuário
 *     tags: [Agendamento]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucesso ao buscar agendamentos
 *       401:
 *         description: Token não especificado, realize o login
 *       404:
 *         description: Nenhum agendamento encontrado
 *       500:
 *         description: Erro interno do servidor
 * 
 * /api/agendamento:
 *   post:
 *     summary: Cria um novo agendamento
 *     tags: [Agendamento]
 *     security:
 *       - bearerAuth: []
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
 *               telefone:
 *                 type: string
 *                 example: "44999999999"
 *               dia:
 *                 type: string
 *                 example: "10/10/2010T03:00:00.000Z"
 *               horario:
 *                 type: string
 *                 example: "18:00 PM"
 *               instrutorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Sucesso ao criar agendamento
 *       400:
 *         description: Telefone inválido
 *       404:
 *         description: Instrutor não disponível ou agendamento já existe
 *       500:
 *         description: Erro interno do servidor
 * 
 * /api/agendamento/{id}:
 *   put:
 *     summary: Edita um agendamento existente
 *     tags: [Agendamento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do agendamento a ser editado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               horario:
 *                 type: string
 *                 format: time
 *                 example: "18:00 PM"
 *     responses:
 *       200:
 *         description: Agendamento editado com sucesso
 *       400:
 *         description: Telefone inválido
 *       404:
 *         description: Agendamento não encontrado ou já existe um agendamento para este dia e horário
 *       500:
 *         description: Erro interno do servidor
 * 
 * /api/agendamento_cancelar/{id}:
 *   delete:
 *     summary: Deleta o agendamento pelo ID
 *     tags: [Agendamento]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          description: ID do agendamento a ser deletado
 *     responses:
 *       200:
 *         description: Agendamento deletado com sucesso
 *       404:
 *         description: Agendamento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

router.get('/agendamentos', async (req, res) => {
    
    const agendamentos = await prisma.agendamento.findMany({
        orderBy: {
            dia: 'asc'
        },
        where: {
            userId: req.dados.userId
        },
        include: {
            instrutor: {
                select: {
                    id: true,
                    nome: true
                }
            }
        }
    })

    const agendamentosFormatado = agendamentos.map(item => ({
            id: item.id,
            nome: item.nome,
            sobrenome: item.sobrenome,
            telefone: item.telefone,
            dia: item.dia,
            horario: item.horario,
            instrutor: item.instrutor.nome
        }))
    
    return res.json({
        success: true,
        data: agendamentosFormatado
    })
})

router.post('/agendamento', validarAgendamento, async (req, res) => {

    try {

        if (req.body.dia && req.body.horario) {
            const [instrutorDisponivel, agendamentoExistente] = await Promise.all([
                instrutorExiste(req.body.instrutorId, req.body.dia),
                instrutorLivre(req.body.instrutorId, req.body.dia, req.body.horario)
            ])

            if (instrutorDisponivel.length < 1) {
                return res.status(404).json({ 
                    success: false,
                    message: "Instrutor não disponível."
                })
            }

            if (agendamentoExistente.length > 0) {
                return res.status(409).json({ 
                    success: false,
                    message: "Já existe um agendamento para este dia e horário."
                })
            }
        }

        const agendamentoFormatado = {
            ...req.body,
            nome: req.dados.nome,
            sobrenome: req.dados.sobrenome,
            telefone: req.dados.telefone,
            dia: req.body.dia,
            horario: req.body.horario,
            userId: req.dados.userId,
            instrutorId: req.body.instrutorId
        }

        const agendamentoCriado = await prisma.agendamento.create({
            data: agendamentoFormatado
        })

        res.status(201).json({
            success: true,
            data: agendamentoCriado
        })

        tasksQ.add('taskAgendamento', {
            ...agendamentoCriado,
            status: 'confirmado'
        }).catch(err => console.log(err))

    } catch (error) {
        if (error.code === 'P2003') {
            return res.status(404).json({ 
                success: false,
                message: "Instrutor não encontrado."
            })
        }
        console.log(error)
        return res.status(500).json({ 
            success: false,
            message: "Erro ao criar agendamento." })
        }
})

router.put('/agendamento/:id', async (req, res) => {

    const { id } = req.params

    try {

        if (req.body.dia && req.body.horario) {
            const [instrutorDisponivel, agendamentoExistente] = await Promise.all([
                instrutorExiste(req.body.instrutorId, req.body.dia),
                instrutorLivre(req.body.instrutorId, req.body.dia, req.body.horario)
            ])

            if (instrutorDisponivel.length < 1) {
                return res.status(404).json({ 
                    success: false,
                    message: "Instrutor não disponível."
                })
            }

            if (agendamentoExistente.length > 0) {
                return res.status(409).json({ 
                    success: false,
                    message: "Já existe um agendamento para este dia e horário."
                })
            }
        }

        const agendamentoFormatadoeAtualizado = {
            ...req.body,
            ...(req.body.horario && { horario: req.body.horario }),
        }

        const agendamentoAtualizado = await prisma.agendamento.update({
            where: {
                id: +id,
                userId: req.dados.userId
            },
            data: agendamentoFormatadoeAtualizado
        })

        tasksQ.add('taskAgendamento', {
            ...agendamentoAtualizado,
            status: 'atualizado'
        }).catch(err => console.log(err))

        res.json({
            success: true,
            data: agendamentoAtualizado
        })

    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ 
                success: false,
                message: "Agendamento não encontrado." })
        } else {
            return res.status(500).json({ 
                success: false,
                message: "Erro ao editar agendamento." })}
        }
})

router.delete('/agendamento_cancelar/:id', async (req, res) => {

    const { id } = req.params

    try {

        const agendamentoCancelado = await prisma.agendamento.delete({
            where: {
                id: +id,
                userId: req.dados.userId
            }
        })

        await tasksQ.add('taskAgendamento', {
            ...agendamentoCancelado,
            status: 'cancelado'
        }).catch(err => console.log(err))

        return res.status(200).json({
            success: true, 
            message: "Agendamento cancelado com sucesso." 
        })
        
    } catch (error) {
        console.log(error)
        if (error.code === 'P2025') {
            return res.status(404).json({ 
                success: false,
                message: "Agendamento não encontrado."
            })
        }
        return res.status(500).json({
            success: false,
            message: "Erro ao deletar agendamento."

        })
    }
})

export default router