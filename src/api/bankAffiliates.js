import API from '@/api/API'
import { API_PATH_BANKS } from '@/api/banks'

export const API_PATH_BANK_AFFILIATES = '/bank_affiliates'
export const getBankAffiliates = () => API.get(API_PATH_BANK_AFFILIATES)
export const getBankAffiliatesByBankId = (bankId) => API.get(`${API_PATH_BANKS}/${bankId}/affiliates`)
export const findBankAffiliate = (id) => API.get(`${API_PATH_BANK_AFFILIATES}/${id}`)
export const createBankAffiliate = (data) => API.post(API_PATH_BANK_AFFILIATES, data)
export const updateBankAffiliate = (id, data) => API.put(`${API_PATH_BANK_AFFILIATES}/${id}`, data)
export const deleteBankAffiliate = (id) => API.delete(`${API_PATH_BANK_AFFILIATES}/${id}`)
