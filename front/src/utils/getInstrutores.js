export default async function getInstrutores() {
    const INSTRUTOR_API = 'http://localhost:8000/api/instrutores'

    try {
        const response = await fetch(INSTRUTOR_API, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (response.ok) {
        const instrutores = await response.json()
        return instrutores['data']
    } else {
        const errorData = await response.json()
        console.log(errorData)
        }
    } catch (error) {
        console.error('Erro ao buscar instrutores:', error)
    }
}