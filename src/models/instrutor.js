import mongoose from "mongoose"

const instrutorSchema = new mongoose.Schema({
    nome: { type: String, unique: true, required: true },
    dia: { type: mongoose.Schema.Types.Mixed, required: true },
    horario: { type: mongoose.Schema.Types.Mixed, required: true },
    agendamentos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agendamento' }]
}, { versionKey: false })

const Instrutor = mongoose.model('Instrutor', instrutorSchema)

export default Instrutor