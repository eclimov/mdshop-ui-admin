import API from '@/api/API'

export const API_PATH_BANKS = '/banks'
export const getBanks = () => API.get(API_PATH_BANKS)
export const findBank = (id) => API.get(`${API_PATH_BANKS}/${id}`)
export const createBank = (data) => API.post(API_PATH_BANKS, data)
export const updateBank = (id, data) => API.put(`${API_PATH_BANKS}/${id}`, data)
export const deleteBank = (id) => API.delete(`${API_PATH_BANKS}/${id}`)
