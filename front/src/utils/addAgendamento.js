export default async function addAgendamento(agendamento) {

    const AGENDAMENTO_API = 'http://localhost:8000/api/agendamento'

    const token = localStorage.getItem('token')

    try {
            const response = await fetch(AGENDAMENTO_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(agendamento),
        })
        if (response.ok) {
            const data = await response.json()
            return { success: true, data: data }
        } else {
            const errorData = await response.json()
            let errorMessage = errorData.message
            return { success: false, message: errorMessage }
        }
        } catch (error) {
            console.error('Erro ao realizar agendamento:', error)
        }
    }