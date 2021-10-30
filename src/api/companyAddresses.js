import API from '@/api/API'

export const API_PATH_COMPANY_ADDRESSES = '/company_addresses'
export const createCompanyAddress = (data) => API.post(API_PATH_COMPANY_ADDRESSES, data)
export const updateCompanyAddress = (id, data) => API.put(`${API_PATH_COMPANY_ADDRESSES}/${id}`, data)
export const deleteCompanyAddress = (id) => API.delete(`${API_PATH_COMPANY_ADDRESSES}/${id}`)
