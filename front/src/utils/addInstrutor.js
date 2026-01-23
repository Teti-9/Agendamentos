export default async function addInstrutor(instrutor) {

    const INSTRUTOR_API = 'http://localhost:8000/api/instrutor'

    try {
            const response = await fetch(INSTRUTOR_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(instrutor),
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
            console.error('Erro ao cadastrar instrutor:', error)
        }
    }