import { API_PATH_BANKS } from '@/api/banks'
import { API_PATH_COMPANIES } from '@/api/companies'

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
    company: `${API_PATH_COMPANIES}/${companyId}`
  }
}
