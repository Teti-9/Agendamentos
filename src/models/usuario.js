import mongoose from "mongoose"

const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    email: { type: String, required: true },
    telefone: { type: String, required: true },
    senha: { type: String, required: true }
}, { versionKey: false })

const Usuario = mongoose.model('Usuario', usuarioSchema)

export default Usuario