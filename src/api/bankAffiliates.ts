import API from '@/api/API'
import { API_PATH_BANKS } from '@/api/banks'
import type { BankAffiliateTypeCreate, BankAffiliateTypeView } from '@/types/bankAffiliate'

export const API_PATH_BANK_AFFILIATES = '/bank_affiliates'
export const getBankAffiliates = () => API.get(API_PATH_BANK_AFFILIATES)
export const getBankAffiliatesByBankId = (bankId: number) => API.get(`${API_PATH_BANKS}/${bankId}/affiliates`)
export const findBankAffiliate = (id: number) => API.get(`${API_PATH_BANK_AFFILIATES}/${id}`)
export const createBankAffiliate = (data: BankAffiliateTypeCreate) => API.post(API_PATH_BANK_AFFILIATES, data)
export const updateBankAffiliate = (id: number, data: BankAffiliateTypeView) => API.put(`${API_PATH_BANK_AFFILIATES}/${id}`, data)
export const deleteBankAffiliate = (id: number) => API.delete(`${API_PATH_BANK_AFFILIATES}/${id}`)
