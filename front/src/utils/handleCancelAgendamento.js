export default async function handleCancelAgendamento(id, setReload) {
    const AGENDAMENTOS_API = `http://localhost:8000/api/agendamento_cancelar/${id}`

    const token = localStorage.getItem('token')

    try {
        const response = await fetch(AGENDAMENTOS_API, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (response.ok) {
        await response.json()
        setReload(prev => !prev)
        alert('Agendamento cancelado com sucesso!')
    } else {
        const errorData = await response.json()
        console.log(errorData)
        }
    } catch (error) {
        console.error('Erro ao deletar:', error)
    }
}