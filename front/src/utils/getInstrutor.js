export default async function getInstrutor(date) {

    const dataFormatada = `${date}T03:00:00.000Z`
    const INSTRUTOR_API = `http://localhost:8000/api/instrutor/${dataFormatada}`

    try {
        const response = await fetch(INSTRUTOR_API, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        const result = await response.json()
        return result.data || result || []
    } else {
        console.error("Erro na resposta da API")
        }
    } catch (error) {
        console.error("Erro ao buscar instrutores:", error)
        return null
    }
}