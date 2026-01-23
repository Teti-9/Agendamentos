import Joi from 'joi'

const validarUsuario = (req, res, next) => {

    const schema = Joi.object({
        nome: Joi.string().min(3).max(30).required(),
        sobrenome: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        telefone: Joi.string().length(11).required(),
        senha: Joi.string().min(4).required()
    })

    const { error } = schema.validate(req.body, { abortEarly: false })

    if (error) {
        return res.status(400).json({ success: false, message: error.details.map(detail => detail.message) })
    }

    next()
}

export default validarUsuario