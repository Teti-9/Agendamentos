import { useEffect } from "react"
import getInstrutores from "../utils/getInstrutores"
import LinhasInstrutores from "../utils/linhasInstrutores"
import addInstructor from "../utils/addInstrutor"
import capitalize from '../utils/capitalize.js'
import formatarHorario from '../utils/formatarHorario.js'
import formatarData from '../utils/formatarData.js'

export default function Admin(props) {
    const { 
        nome, dia, horario, 
        setNome, setDia, setHorario, 
        setPage, instrutores, setInstrutores, 
        reload, setReload} = props

    useEffect(() => {
        async function loadInstrutores() {
            setNome('')
            setDia('')
            setHorario('')

            const data = await getInstrutores()
            setInstrutores(data)
        }
        loadInstrutores()
    }, [reload, setInstrutores, setNome, setDia, setHorario])

    async function handleAddInstructor(e) {
        e.preventDefault() 

        const instrutor = {
            nome: capitalize(nome),
            dia: formatarData(dia),
            horario: formatarHorario(horario)
        }

        const response = await addInstructor(instrutor)

        if (response.success) {
            setReload(prev => !prev)
            alert('Cadastro do instrutor efetuado com sucesso!')       
        } else {
            alert(response.message)
        }
    }

    return (
        <section className="admin">
            <div className="admin-header">
                <h1 className="title-h1">Painel Administrativo</h1>
                <button className="btn-exit" onClick={() => setPage(0) }>Sair</button>
            </div>
                <div className="admin-section">
                    <h2 className="title">Gerenciar Instrutores</h2>
                    <form id="addInstructorForm" onSubmit={handleAddInstructor}>
                        <label htmlFor="name">Nome do Instrutor:</label>
                            <input type="text" placeholder="Nome do Instrutor." name="name" value={nome} onChange={(e) => {setNome(e.target.value)}} required />
                        <label htmlFor="days">Dias disponíveis:</label>
                            <input type="text" placeholder="Data(s) separada(s) por vírgula. (10/10/2010, 11/11/2011)." name="days" value={dia} onChange={(e) => {setDia(e.target.value)}} required />
                        <label htmlFor="hours">Horários disponíveis:</label>
                            <input placeholder="Horário(s) separado(s) por vírgula. (13:00, 14:30)." type="text" name="hours" value={horario} onChange={(e) => {setHorario(e.target.value)}} required />
                        <button className="btn-action" type="submit" >Criar Instrutor</button>
                    </form>

                <h3 className="title-h3">Lista de Instrutores</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Dias Disponíveis</th>
                            <th>Horários Disponíveis</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <LinhasInstrutores data={instrutores} setReload={setReload} />
                    </tbody>
                </table>
            </div>
        </section>
    )
}