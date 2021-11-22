import API from '@/api/API'

export const API_PATH_COMPANY_EMPLOYEES = '/company_employees'
export const generateCompanyEmployeePath = (companyEmployeeId) => `${API_PATH_COMPANY_EMPLOYEES}/${companyEmployeeId}`

export const createCompanyEmployee = (data) => API.post(API_PATH_COMPANY_EMPLOYEES, data)
export const updateCompanyEmployee = (id, data) => API.put(`${API_PATH_COMPANY_EMPLOYEES}/${id}`, data)
export const deleteCompanyEmployee = (id) => API.delete(`${API_PATH_COMPANY_EMPLOYEES}/${id}`)
