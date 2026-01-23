import Joi from 'joi'

const validarInstrutor = (req, res, next) => {

    const schema = Joi.object({
        nome: Joi.string().min(3).max(30).required(),
        dia: Joi.array().items(Joi.date().iso()).min(1).required(),
        horario: Joi.string().min(5).required()
    })

    const { error } = schema.validate(req.body, { abortEarly: false })

    if (error) {
        return res.status(400).json({ success: false, message: error.details.map(detail => detail.message) })
    }

    next()
}

export default validarInstrutor