import type { BankTypeCreate, BankTypeView } from '@/types/bank'
import type { BankAffiliateTypeCreate, BankAffiliateTypeView } from '@/types/bankAffiliate'
import { API_PATH_BANKS } from '@/api/banks'
import type { CompanyTypeCreate, CompanyTypeView } from '@/types/company'
import type { CompanyAddressTypeCreate, CompanyAddressTypeView } from '@/types/companyAddress'
import { API_PATH_COMPANIES, generateCompanyPath } from '@/api/companies'
import type { CompanyEmployeeTypeCreate, CompanyEmployeeTypeView } from '@/types/companyEmployee'
import type { InvoiceTypeCreate, InvoiceTypeView } from '@/types/invoice'
import type { UserTypeCreate, UserTypeView } from '@/types/user'

export const getEmptyBankCreate = (): BankTypeCreate => {
  return {
    name: ''
  }
}

export const getEmptyBankView = (): BankTypeView => {
  return {
    ...getEmptyBankCreate(),
    id: 0,
    created_at: ''
  }
}

export const mapBankViewToCreate = (bank: BankTypeView): BankTypeCreate => {
  return { name: bank.name }
}

export const getEmptyBankAffiliateCreate = (): BankAffiliateTypeCreate => {
  return {
    affiliateNumber: '',
    bank: ''
  }
}

export const getEmptyBankAffiliateView = (): BankAffiliateTypeView => {
  return {
    affiliateNumber: '',
    created_at: '',
    id: 0
  }
}

export const mapBankAffiliateViewToCreate = (bankAffiliate: BankAffiliateTypeView, bankId: string): BankAffiliateTypeCreate => {
  return {
    affiliateNumber: bankAffiliate.affiliateNumber,
    bank: `${API_PATH_BANKS}/${bankId}`
  }
}

export const getEmptyCompanyCreate = (): CompanyTypeCreate => {
  return {
    name: '',
    shortName: '',
    iban: '',
    fiscalCode: '',
    vat: '',
    bankAffiliate: ''
  }
}

export const getEmptyCompanyView = (): CompanyTypeView => {
  return {
    ...getEmptyCompanyCreate(),
    logo: '',
    id: 0,
    created_at: ''
  }
}

export const mapCompanyViewToCreate = (company: CompanyTypeView): CompanyTypeCreate => {
  return {
    name: company.name,
    shortName: company.shortName,
    iban: company.iban,
    fiscalCode: company.fiscalCode,
    vat: company.vat,
    bankAffiliate: company.bankAffiliate
  }
}

export const getEmptyCompanyAddressCreate = (): CompanyAddressTypeCreate => {
  return {
    address: '',
    juridic: false,
    company: ''
  }
}

export const getEmptyCompanyAddressView = (): CompanyAddressTypeView => {
  return {
    address: '',
    juridic: false,
    created_at: '',
    id: 0
  }
}

export const mapCompanyAddressViewToCreate = (companyAddress: CompanyAddressTypeView, companyId: string): CompanyAddressTypeCreate => {
  return {
    address: companyAddress.address,
    juridic: companyAddress.juridic,
    company: generateCompanyPath(companyId)
  }
}

export const getEmptyCompanyEmployeeCreate = (): CompanyEmployeeTypeCreate => {
  return {
    company: '',
    name: '',
    position: 'Consultant'
  }
}

export const getEmptyCompanyEmployeeView = (): CompanyEmployeeTypeView => {
  return {
    name: '',
    position: 'Consultant',
    created_at: '',
    id: 0
  }
}

export const mapCompanyEmployeeViewToCreate = (companyEmployee: CompanyEmployeeTypeView, companyId: string): CompanyEmployeeTypeCreate => {
  return {
    name: companyEmployee.name,
    position: companyEmployee.position,
    company: generateCompanyPath(companyId)
  }
}

export const getEmptyInvoiceCreate = (): InvoiceTypeCreate => {
  return {
    approvedByEmployee: '',
    buyer: '',
    carrier: '',
    loadingPoint: '',
    processedByEmployee: '',
    seller: '',
    unloadingPoint: '',
    attachedDocument: '',
    deliveryDate: '',
    orderDate: '',
    recipientName: ''
  }
}

export const getEmptyInvoiceView = (): InvoiceTypeView => {
  return {
    ...getEmptyInvoiceCreate(),
    approvedByEmployee: getEmptyCompanyEmployeeView(),
    buyer: getEmptyCompanyView(),
    carrier: getEmptyCompanyView(),
    loadingPoint: getEmptyCompanyAddressView(),
    processedByEmployee: getEmptyCompanyEmployeeView(),
    seller: getEmptyCompanyView(),
    unloadingPoint: getEmptyCompanyAddressView(),
    id: 0,
    created_at: ''
  }
}

export const getEmptyUserCreate = (): UserTypeCreate => {
  return {
    company: '',
    email: '',
    password: ''
  }
}

export const getEmptyUserView = (): UserTypeView => {
  return {
    company: getEmptyCompanyView(),
    email: '',
    id: 0,
    created_at: ''
  }
}

export const mapUserViewToCreate = (user: UserTypeView, companyId: string): UserTypeCreate => {
  return {
    email: user.email,
    password: user.password as string,
    company: generateCompanyPath(companyId)
  }
}
