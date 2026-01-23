import { format } from  'date-fns'
import { ptBR } from 'date-fns/locale'
import handleCancelAgendamento from '../utils/handleCancelAgendamento.js'
import getInstrutor from '../utils/getInstrutor.js'

export default function LinhasAgendamentos({ data, setReload, setAgendamentoEdit, setNovoHorario, setNovoHorarioSelecionado}) {

    const handleEdit = async (agendamento) => {

        setAgendamentoEdit(agendamento)
        setNovoHorarioSelecionado(agendamento.horario)

        const data = await getInstrutor(agendamento.dia.split('T')[0])

        if (data) {
            const inst = data.find(i => i.nome === agendamento.instrutor)
            if (inst) {
                const lista = inst.horario.split(',').map(h => h.trim())
                setNovoHorario(lista)
            }
        }
    }

    return data.map((agendamento) => (
        <tr key={agendamento.id}>
            <td>{agendamento.nome} {agendamento.sobrenome}</td>
            <td>
                <div>
                    {format(new Date(agendamento.dia), 'dd/MM/yyyy', { locale: ptBR })}
                </div>
            </td>
            <td>{agendamento.horario}</td>
            <td>{agendamento.instrutor}</td>
            <td>
                <button className="edit-btn" onClick={() => handleEdit(agendamento)}>Editar</button>
                <button className="delete-btn" onClick={() => handleCancelAgendamento(agendamento.id, setReload)}>Cancelar</button>
            </td>
        </tr>
    ))
}