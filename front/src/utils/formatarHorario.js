import moment from 'moment'

function formatarHorario(horarios) {
  
  if (typeof horarios === 'string' && horarios.includes(',')) {
    return horarios
      .split(',')
      .map(horario => moment(horario.trim(), 'HH:mm').format('HH:mm A'))
      .join(', ');
  }

  return moment(horarios, 'HH:mm').format('HH:mm A');
}

export default formatarHorario