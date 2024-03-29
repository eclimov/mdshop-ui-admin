import API from '@/api/API'

export const API_PATH_COMPANIES = '/companies'
export const generateCompanyPath = (companyId) => `${API_PATH_COMPANIES}/${companyId}`

export const getCompanies = () => API.get(API_PATH_COMPANIES)
export const findCompany = (id) => API.get(`${API_PATH_COMPANIES}/${id}`)
export const getCompanyAddressesByCompanyId = (id) => API.get(`${API_PATH_COMPANIES}/${id}/addresses`)
export const getCompanyEmployeesByCompanyId = (id) => API.get(`${API_PATH_COMPANIES}/${id}/employees`)
export const getBankAffiliateByCompanyId = (id) => API.get(`${API_PATH_COMPANIES}/${id}/bank_affiliate`)
export const createCompany = (data) => API.post(API_PATH_COMPANIES, data)
export const updateCompany = (id, data) => API.put(`${API_PATH_COMPANIES}/${id}`, data)
export const deleteCompany = (id) => API.delete(`${API_PATH_COMPANIES}/${id}`)

export const uploadLogo = (id, data) => API.post(`${API_PATH_COMPANIES}/${id}/logo`, data)
