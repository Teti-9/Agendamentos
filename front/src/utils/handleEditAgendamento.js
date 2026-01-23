export default async function handleEditAgendamento(id, data, setReload, setAgendamentoEdit) {

    const AGENDAMENTOS_API = `http://localhost:8000/api/agendamento/${id}`

    const token = localStorage.getItem('token')

    try {
        const response = await fetch(AGENDAMENTOS_API, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ horario: data })
    })
    if (response.ok) {
        await response.json()
        setAgendamentoEdit(null)
        setReload(prev => !prev)
        alert('Agendamento editado com sucesso!')
    } else {
        const errorData = await response.json()
        console.log(errorData)
        }
    } catch (error) {
        console.error('Erro ao editar:', error)
    }
}