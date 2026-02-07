import moment from 'moment'

function formatarHorario(horarios) {
  if (typeof horarios === 'string' && horarios.includes(',')) {
    return horarios
      .split(',')
      .map(h => h.trim())
      .filter(h => h !== "")
      .map(h => moment(h, 'HH:mm').format('HH:mm A'));
  }

  return [moment(horarios.trim(), 'HH:mm').format('HH:mm A')];
}

export default formatarHorario