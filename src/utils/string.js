export const datetimeFormat = (utcDateString) => {
  return (new Date(utcDateString)).toLocaleString('ru-MD', { hour12: false })
}

export const dateFormat = (utcDateString) => {
  return (new Date(utcDateString)).toLocaleDateString('ru-MD')
}
