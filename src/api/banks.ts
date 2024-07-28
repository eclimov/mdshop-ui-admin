import API from '@/api/API'
import type { BankTypeCreate, BankTypeView } from '@/types/bank'

export const API_PATH_BANKS = '/banks'
export const getBanks = () => API.get(API_PATH_BANKS)
export const findBank = (id: string) => API.get(`${API_PATH_BANKS}/${id}`)
export const createBank = (data: BankTypeCreate) => API.post(API_PATH_BANKS, data)
export const updateBank = (id: number, data: BankTypeView) => API.put(`${API_PATH_BANKS}/${id}`, data)
export const deleteBank = (id: number) => API.delete(`${API_PATH_BANKS}/${id}`)
