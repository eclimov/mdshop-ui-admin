import API from '@/api/API'

export const getBanks = () => API.get('/banks')
export const findBank = (id) => API.get(`/banks/${id}`)
export const createBank = (data) => API.post('/banks', data)
export const updateBank = (id, data) => API.put(`/banks/${id}`, data)
export const deleteBank = (id) => API.delete(`/banks/${id}`)
