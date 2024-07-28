import API from '@/api/API'
import type { CompanyEmployeeTypeCreate, CompanyEmployeeTypeView } from '@/types/companyEmployee'

export const API_PATH_COMPANY_EMPLOYEES = '/company_employees'
export const generateCompanyEmployeePath = (companyEmployeeId: number) => `${API_PATH_COMPANY_EMPLOYEES}/${companyEmployeeId}`

export const findCompanyEmployee = (id: number) => API.get(`${API_PATH_COMPANY_EMPLOYEES}/${id}`)
export const createCompanyEmployee = (data: CompanyEmployeeTypeCreate) => API.post(API_PATH_COMPANY_EMPLOYEES, data)
export const updateCompanyEmployee = (id: number, data: CompanyEmployeeTypeView) => API.put(`${API_PATH_COMPANY_EMPLOYEES}/${id}`, data)
export const deleteCompanyEmployee = (id: number) => API.delete(`${API_PATH_COMPANY_EMPLOYEES}/${id}`)
