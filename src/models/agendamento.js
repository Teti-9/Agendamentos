import mongoose from "mongoose"

const agendamentoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    telefone: { type: String, required: true },
    dia: { type: Date, required: true },
    horario: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    instrutor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instrutor' },
}, { versionKey: false })

const Agendamento = mongoose.model('Agendamento', agendamentoSchema)

export default Agendamento