import API from '@/api/API'
import type { CompanyAddressTypeCreate, CompanyAddressTypeView } from '@/types/companyAddress'

export const API_PATH_COMPANY_ADDRESSES = '/company_addresses'
export const generateCompanyAddressPath = (companyAddressId: number) => `${API_PATH_COMPANY_ADDRESSES}/${companyAddressId}`

export const createCompanyAddress = (data: CompanyAddressTypeCreate) => API.post(API_PATH_COMPANY_ADDRESSES, data)
export const updateCompanyAddress = (id: number, data: CompanyAddressTypeView) => API.put(`${API_PATH_COMPANY_ADDRESSES}/${id}`, data)
export const deleteCompanyAddress = (id: number) => API.delete(`${API_PATH_COMPANY_ADDRESSES}/${id}`)
