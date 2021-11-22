import { API_PATH_BANKS } from '@/api/banks'
import { generateCompanyPath } from '@/api/companies'

export const getBankObject = () => {
  return {
    name: ''
  }
}

export const getCompanyObject = () => {
  return {
    name: '',
    shortName: '',
    iban: '',
    fiscalCode: '',
    vat: '',
    bankAffiliate: null
  }
}

export const getBankAffiliateObject = (bankId) => {
  return {
    affiliateNumber: '',
    bank: `${API_PATH_BANKS}/${bankId}`
  }
}

export const getCompanyAddressObject = (companyId) => {
  return {
    address: '',
    juridic: false,
    company: generateCompanyPath(companyId)
  }
}

export const getCompanyEmployeeObject = (companyId) => {
  return {
    name: '',
    position: null,
    company: generateCompanyPath(companyId)
  }
}

export const getUserObject = () => {
  return {
    email: '',
    password: '',
    company: null
  }
}
