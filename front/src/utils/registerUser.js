export default async function registerUser(registro) {

    const REGISTRAR_API = 'http://localhost:8000/auth/registrar'

    try {
            const response = await fetch(REGISTRAR_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registro),
        })
        if (response.ok) {
            const data = await response.json()
            return {sucess: true, data: data}
        } else {
            const errorData = await response.json()
            let errorMessage = errorData.message

            if (errorData.message === 'Email já cadastrado.') {
                errorMessage = "Email já cadastrado. Por favor, utilize outro email."
            } 

            return {sucess: false, message: errorMessage}
        }
        } catch (error) {
            console.error('Erro ao fazer registro:', error)
        }

}