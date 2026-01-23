export default async function authUser(login) {

    const TOKEN_API = 'http://localhost:8000/auth/logar'

    try {
            const response = await fetch(TOKEN_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(login),
        })
        if (response.ok) {
            const data = await response.json()
            return {sucess: true, data: data}
        } else {
            const errorData = await response.json()
            let errorMessage = errorData.message

            if (errorData.message === 'Senha inválida') {
                errorMessage = "Senha inválida, por favor verifique a senha digitada."
            } else if (errorData.message === 'Email não encontrado.') {
                errorMessage = "Email não encontrado, por favor verifique o email digitado."
            }

            return {sucess: false, message: errorMessage}
        }
        } catch (error) {
            console.error('Erro ao fazer login:', error)
        }
    }