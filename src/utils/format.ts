export const formatDatePtBr = (isoDate: string): string => {
  const value = new Date(isoDate)
  if (Number.isNaN(value.getTime())) {
    return isoDate
  }

  return value.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export const calculateAgeYears = (isoDate: string): number => {
  const birthDate = new Date(isoDate)
  if (Number.isNaN(birthDate.getTime())) {
    return 0
  }

  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const beforeBirthday =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())

  if (beforeBirthday) {
    age -= 1
  }

  return Math.max(age, 0)
}

export const vaccineStatus = (nextDoseDate: string): 'ok' | 'warning' | 'danger' => {
  const date = new Date(nextDoseDate)
  if (Number.isNaN(date.getTime())) {
    return 'ok'
  }

  const today = new Date()
  const ms = date.getTime() - today.getTime()
  const days = Math.ceil(ms / (1000 * 60 * 60 * 24))

  if (days < 0) {
    return 'danger'
  }

  if (days <= 30) {
    return 'warning'
  }

  return 'ok'
}
