import { format } from  'date-fns'
import { ptBR } from 'date-fns/locale'

export default function LinhasInstrutores({ data, setReload }) {

    async function handleDeleteInstructor(id) {
        const INSTRUTOR_API = `http://localhost:8000/api/instrutor/${id}`

        try {
            const response = await fetch(INSTRUTOR_API, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (response.ok) {
            await response.json()
            setReload(prev => !prev)
            alert('Instrutor deletado com sucesso!')
        } else {
            const errorData = await response.json()
            console.log(errorData)
            }
        } catch (error) {
            console.error('Erro ao deletar:', error)
        }

    }

    return data.map((instrutor) => (
        <tr key={instrutor.id}>
            <td>{instrutor.nome}</td>
            <td>
                {instrutor.dia.map((dia, index) => (
                    <div key={index}>
                        {format(new Date(dia), 'dd/MM/yyyy', { locale: ptBR })}
                    </div>
                ))}
             </td>
            <td>{instrutor.horario}</td>
            <td>
                <button className="delete-btn" onClick={() => handleDeleteInstructor(instrutor.id)}>Excluir</button>
            </td>
        </tr>
    ))
}