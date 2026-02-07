import { useEffect } from "react"
import addAgendamento from '../utils/addAgendamento'
import LinhasAgendamentos from '../utils/linhasAgendamentos'
import getAgendamentos from "../utils/getAgendamentos"
import handleEditAgendamento from "../utils/handleEditAgendamento"
import getInstrutor from '../utils/getInstrutor.js'
import logoutUser from '../utils/logoutUser.js'

export default function Dashboard(props) {
    const {
        reload, setReload,
        setPage, date, setDate,
        instrutorDate, setInstrutorDate, instrutorSelecionado,
        setInstrutorSelecionado, instrutorHorario, setInstrutorHorario,
        agendamentos, setAgendamentos, agendamentoEdit, setAgendamentoEdit,
        novoHorario, setNovoHorario, novoHorarioSelecionado, setNovoHorarioSelecionado } = props

    useEffect(() => {
        async function loadAgendamentos() {
            setDate('')
            setInstrutorSelecionado('')
            setInstrutorHorario('')

            const data = await getAgendamentos()
            setAgendamentos(data)
        }
        loadAgendamentos()
    }, [reload, setAgendamentos, setDate, setInstrutorHorario, setInstrutorSelecionado])

    const handleAgendamento = async (e) => {
        e.preventDefault()

        const agendamento = {
            dia: date + "T03:00:00.000Z",
            horario: instrutorHorario,
            instrutorId: instrutorSelecionado
            // instrutorId: Number(instrutorSelecionado) PRISMA SQL
        }

        const response = await addAgendamento(agendamento)

        if (response.success) {
            setDate('')
            setInstrutorDate([])
            setInstrutorSelecionado('')
            setInstrutorHorario([])

            setReload(prev => !prev)
            alert('Agendamento efetuado com sucesso!')
        } else {
            alert(response.message)
        }
    }

    return (
        <section className="dashboard">
            <div className="header">
                <h1>Bem-vindo(a)</h1>
                <div>
                    <button className="btn-exit-dash" onClick={() => logoutUser(setPage)}>Sair</button>
                </div>
            </div>

            <h2>Adicionar Novo Agendamento</h2>

            <form onSubmit={async (e) => {
                e.preventDefault()

                const data = await getInstrutor(date)

                if (data) {
                    setInstrutorDate(data)
                } else {
                    setInstrutorDate([])
                    alert('Nenhum instrutor disponível para esta data.')
                }

                setInstrutorSelecionado('')
                setInstrutorHorario([])
            }}>
                <label className="dia-label" htmlFor="date">Selecione o dia do agendamento: </label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <button type="submit"> Buscar Instrutor </button>
            </form>

            <label htmlFor="instrutor">Instrutor disponível: </label>
            <select
                id="instrutor"
                name="instrutor"
                value={instrutorSelecionado}
                onChange={(e) => {
                    setInstrutorSelecionado(e.target.value)
                    setInstrutorHorario('')
                }}
                disabled={!instrutorDate || instrutorDate.length === 0}
            >
                {/* instrutor.id PRISMA SQL */}
                <option value="0">Selecione um instrutor</option>
                {Array.isArray(instrutorDate) && instrutorDate.map((instrutor) => (
                    <option key={instrutor._id} value={instrutor._id}>
                        {instrutor.nome}
                    </option>
                ))}
            </select>
            <label htmlFor="horario">Horário: </label>
            <select
                id="horario"
                name="horario"
                value={instrutorHorario}
                onChange={(e) => setInstrutorHorario(e.target.value)}
                disabled={!instrutorSelecionado}
                required
            >
                <option value="">Selecione um horário</option>
                {Array.isArray(instrutorDate) &&
                    instrutorDate
                        .filter(inst => inst._id == instrutorSelecionado) // inst.id PRISMA SQL
                        .map((inst) => {

                            const horarios = Array.isArray(inst.horario)
                                ? inst.horario
                                : inst.horario.split(',');

                            return horarios.map((hora, index) => (
                                <option key={index} value={hora.trim()}>
                                    {hora.trim()}
                                </option>
                            ));
                        })
                }
            </select>
            <button className="btn-action" onClick={(e) => { handleAgendamento(e) }}>Adicionar Agendamento</button>

            <h3 className="title-h3">Lista de Agendamentos</h3>
            <table>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Data</th>
                        <th>Horário</th>
                        <th>Instrutor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <LinhasAgendamentos
                        data={agendamentos}
                        setReload={setReload}
                        setAgendamentoEdit={setAgendamentoEdit}
                        setNovoHorario={setNovoHorario}
                        setNovoHorarioSelecionado={setNovoHorarioSelecionado} />
                </tbody>
            </table>

            {agendamentoEdit && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Alterar Horário</h3>
                        <p><strong>Cliente:</strong> {agendamentoEdit.nome}</p>
                        <p><strong>Instrutor:</strong> {agendamentoEdit.instrutor}</p>

                        <label htmlFor="novo-horario">Escolha um novo horário:</label>
                        <select
                            id="novo-horario"
                            value={novoHorarioSelecionado}
                            onChange={(e) => setNovoHorarioSelecionado(e.target.value)}
                        >
                            {novoHorario.map((hora, index) => (
                                <option key={index} value={hora}>{hora}</option>
                            ))}
                        </select>

                        <div className="modal-actions">
                            {/* agendamentoEdit.id PRISMA SQL */}
                            <button className="btn-save" onClick={() => handleEditAgendamento(agendamentoEdit._id, novoHorarioSelecionado,
                                setReload, setAgendamentoEdit)}>
                                Confirmar Alteração
                            </button>
                            <button className="btn-cancel" onClick={() => setAgendamentoEdit(null)}>
                                Voltar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}