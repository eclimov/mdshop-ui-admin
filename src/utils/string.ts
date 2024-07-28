export const datetimeFormat = (utcDateString: string) => {
  return (new Date(utcDateString)).toLocaleString('ru-MD', { hour12: false })
}

export const dateFormat = (utcDateString: string) => {
  return (new Date(utcDateString)).toLocaleDateString('ru-MD')
}
