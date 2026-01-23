import Joi from 'joi'

const validarLogin = (req, res, next) => {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        senha: Joi.string().min(4).required()
    })

    const { error } = schema.validate(req.body, { abortEarly: false })

    if (error) {
        return res.status(400).json({ success: false, message: error.details.map(detail => detail.message) })
    }

    next()
}

export default validarLogin