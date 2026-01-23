import { useEffect } from "react"
import authUser from "../utils/authUser"

export default function Index(props) {
    const {email, senha, setEmail, setSenha, setPage} = props

    useEffect(() => {
        setEmail('')
        setSenha('')
    }, [setEmail, setSenha])

    async function handleLogin(e) {

        e.preventDefault()

        const login = {
            email: email,
            senha: senha
        }

        const response = await authUser(login)

        if (response.sucess) {
            const token = response.data.split(' ')[1]
            localStorage.setItem('token', token)
            alert("Login realizado com sucesso!")
            setPage(2)           
        } else {
            alert(response.message)
        }
    }

    return (
        <div className="login-page">
            <div className="container">
                <h2 className="title">Acesso de Usuário</h2>
                <form id="loginForm" onSubmit={handleLogin}>
                    <label htmlFor="username">Email:</label>
                    <input type="text" id="username" name="username" value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} required />
                    <label htmlFor="password">Senha:</label>
                    <input type="password" id="password" name="password" value={senha} onChange={(e) => {
                        setSenha(e.target.value)
                    }} required />
                    <button className="btn-action" disabled={!email || !senha} type="submit" >Entrar</button>
                </form>

                <button 
                onClick={() => setPage(1)} 
                style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: 'blue', 
                    textDecoration: 'underline', 
                    cursor: 'pointer',
                    padding: 0,
                    paddingTop: '10px'
                }}
                >
                Registre-se aqui!
                </button>

                <hr />
                <p>
                    <button className="btn-href" onClick={() => setPage(3)}>
                        Acesso Administrativo
                    </button>
                </p>
            </div>
        </div>
    )}