import API from '@/api/API'

export const getCompanies = () => API.get('/companies')
export const findCompany = (id) => API.get(`/companies/${id}`)
export const createCompany = (data) => API.post('/companies', data)
export const updateCompany = (id, data) => API.put(`/companies/${id}`, data)
export const deleteCompany = (id) => API.delete(`/companies/${id}`)
