import API from '@/api/API'
import type { CompanyTypeCreate, CompanyTypeLogo, CompanyTypeView } from '@/types/company'

export const API_PATH_COMPANIES = '/companies'
export const generateCompanyPath = (companyId: string) => `${API_PATH_COMPANIES}/${companyId}`

export const getCompanies = () => API.get(API_PATH_COMPANIES)
export const findCompany = (id: string) => API.get(`${API_PATH_COMPANIES}/${id}`)
export const getCompanyAddressesByCompanyId = (id: number) => API.get(`${API_PATH_COMPANIES}/${id}/addresses`)
export const getCompanyEmployeesByCompanyId = (id: number) => API.get(`${API_PATH_COMPANIES}/${id}/employees`)
export const getBankAffiliateByCompanyId = (id: number) => API.get(`${API_PATH_COMPANIES}/${id}/bank_affiliate`)
export const createCompany = (data: CompanyTypeCreate) => API.post(API_PATH_COMPANIES, data)
export const updateCompany = (id: number, data: CompanyTypeView) => API.put(`${API_PATH_COMPANIES}/${id}`, data)
export const deleteCompany = (id: number) => API.delete(`${API_PATH_COMPANIES}/${id}`)

export const uploadLogo = (id: number, data: CompanyTypeLogo) => API.post(`${API_PATH_COMPANIES}/${id}/logo`, data)
