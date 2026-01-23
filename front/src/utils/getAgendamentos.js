export default async function getAgendamentos() {
    const AGENDAMENTOS_API = 'http://localhost:8000/api/agendamentos'

    const token = localStorage.getItem('token')

    try {
        const response = await fetch(AGENDAMENTOS_API, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (response.ok) {
        const agendamentos = await response.json()
        return agendamentos['data']
    } else {
        const errorData = await response.json()
        console.log(errorData)
        }
    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error)
    }
}