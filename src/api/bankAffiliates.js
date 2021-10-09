import API from '@/api/API'
import { API_PATH_BANKS } from '@/api/banks'

export const getBankAffiliatesByBankId = (bankId) => API.get(`${API_PATH_BANKS}/${bankId}/affiliates`)
export const findBankAffiliate = (id) => API.get(`/bank_affiliates/${id}`)
export const createBankAffiliate = (data) => API.post('/bank_affiliates', data)
export const updateBankAffiliate = (id, data) => API.put(`/bank_affiliates/${id}`, data)
export const deleteBankAffiliate = (id) => API.delete(`/bank_affiliates/${id}`)
