import { useEffect } from "react"
import registerUser from "../utils/registerUser"
import capitalize from '../utils/capitalize.js'
import formatarEChecarCelularBR from '../utils/formatarTelefone.js'

export default function Registro(props) {
    const {nome, sobrenome, email, senha, telefone, setNome, setSobrenome, setEmail, setSenha, setTelefone, setPage} = props

    useEffect(() => {
        setNome('')
        setSobrenome('')
        setEmail('')
        setTelefone('')
        setSenha('')
    }, [setNome, setSobrenome, setEmail, setSenha, setTelefone])

    async function handleRegistro(e) {

        e.preventDefault()

        const registro = {
            nome: capitalize(nome),
            sobrenome: capitalize(sobrenome),
            email: email,
            telefone: formatarEChecarCelularBR(telefone).numero,
            senha: senha
        }

        const response = await registerUser(registro)

        if (response.sucess) {
            setPage(0)
            setNome('')
            setSobrenome('')
            setEmail('')
            setTelefone('')
            setSenha('')
            alert('Registro efetuado com sucesso!')
        } else {
            alert(response.message)
        }
    }

    return (
        <div className="login-page">
            <div className="container">
                <h2 className="title">Registro de Usuário</h2>
                <form id="registroForm" onSubmit={handleRegistro}>
                    <label htmlFor="name">Nome:</label>
                    <input type="text" id="name" name="name" value={nome} onChange={(e) => {
                        setNome(e.target.value)
                    }} required />
                    <label htmlFor="sobrenome">Sobrenome:</label>
                    <input type="text" id="sobrenome" name="sobrenome" value={sobrenome} onChange={(e) => {
                        setSobrenome(e.target.value)
                    }} required />
                    <label htmlFor="username">Email:</label>
                    <input type="text" id="username" name="username" value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} required />
                    <label htmlFor="telefone">Telefone:</label>
                    <input type="text" id="telefone" name="telefone" value={telefone} onChange={(e) => {
                        setTelefone(e.target.value)
                    }} required />
                    <label htmlFor="password">Senha:</label>
                    <input type="password" id="password" name="password" value={senha} onChange={(e) => {
                        setSenha(e.target.value)
                    }} required />
                    <button className="btn-action" disabled={!email || !senha} type="submit" >Registrar</button>
                </form>

                <button 
                onClick={() => setPage(0)} 
                style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: 'blue', 
                    textDecoration: 'underline', 
                    cursor: 'pointer',
                    padding: 0,
                    paddingTop: '10px',
                    marginLeft: '3px'
                }}
                >
                Logar!
                </button>
            </div>
        </div>
    )}