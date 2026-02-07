import Joi from 'joi'

const validarAgendamento = (req, res, next) => {

    const dados = {
        ...req.dados,
        ...req.body
    }

    const schema = Joi.object({
        nome: Joi.string().min(3).max(30).required(),
        sobrenome: Joi.string().min(3).max(30).required(),
        telefone: Joi.string().length(11).required(),
        horario: Joi.string().min(6).required(),
        // instrutorId: Joi.number().integer().required(), // PRISMA SQL
    }).unknown(true)

    const { error } = schema.validate(dados, { abortEarly: false })

    if (error) {
        return res.status(400).json({ success: false, message: error.details.map(detail => detail.message) })
    }

    next()
}

export default validarAgendamento