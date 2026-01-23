import './App.css'
import Index from './components/Index'
import Registro from './components/Registro'
import Dashboard from './components/Dashboard'
import Admin from './components/Admin'
import Layout from './components/Layout'
import { useState, useEffect } from 'react'

function App() {

  // Controle de páginas
  const [page, setPage] = useState(0)
  const [reload, setReload] = useState(false)

  // Login e Registro
  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')

  // Admin
  const [dia, setDia] = useState('')
  const [horario, setHorario] = useState('')
  const [instrutores, setInstrutores] = useState([])

  // Dashboard
  const [date, setDate] = useState('')
  const [instrutorDate, setInstrutorDate] = useState([])
  const [instrutorSelecionado, setInstrutorSelecionado] = useState(0)
  const [instrutorHorario, setInstrutorHorario] = useState([])
  const [agendamentos, setAgendamentos] = useState([])
  const [agendamentoEdit, setAgendamentoEdit] = useState(null)
  const [novoHorario, setNovoHorario] = useState([])
  const [novoHorarioSelecionado, setNovoHorarioSelecionado] = useState('')

  const pages = {
    0: <Index email={email} senha={senha} 
    setEmail={setEmail} setSenha={setSenha} setPage={setPage} />,

    1: <Registro nome={nome} sobrenome={sobrenome} email={email} senha={senha} telefone={telefone} 
    setNome={setNome} setSobrenome={setSobrenome} setEmail={setEmail} setSenha={setSenha} setTelefone={setTelefone} setPage={setPage} />,

    2: <Dashboard nome={nome} sobrenome={sobrenome} telefone={telefone} date={date} instrutorDate={instrutorDate} 
    instrutorSelecionado={instrutorSelecionado} instrutorHorario={instrutorHorario} reload={reload}
    agendamentos={agendamentos} agendamentoEdit={agendamentoEdit} novoHorario={novoHorario} novoHorarioSelecionado={novoHorarioSelecionado}
    setInstrutorDate={setInstrutorDate} setPage={setPage} setDate={setDate} 
    setInstrutorSelecionado={setInstrutorSelecionado} setInstrutorHorario={setInstrutorHorario} 
    setReload={setReload} setAgendamentos={setAgendamentos} setAgendamentoEdit={setAgendamentoEdit} 
    setNovoHorario={setNovoHorario} setNovoHorarioSelecionado={setNovoHorarioSelecionado}/>,
    
    3: <Admin nome={nome} dia={dia} horario={horario} instrutores={instrutores} reload={reload}
    setNome={setNome} setDia={setDia} setHorario={setHorario} 
    setPage={setPage} setInstrutores={setInstrutores} setReload={setReload}/>
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setPage(0)
    } else {
      if (token) {
        setPage(2)
      }
    }
  }, [])

  return (
    <Layout>
      {pages[page]}
    </Layout>
  )
}

export default App