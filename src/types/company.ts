import type { BankAffiliateTypeView } from '@/types/bankAffiliate'
import type { BaseType } from '@/types/_base'

interface CompanyBaseType {
  bankAffiliate: string | BankAffiliateTypeView
  fiscalCode: string
  iban: string
  name: string
  shortName: string
  vat: string
}

export type { CompanyBaseType as CompanyTypeCreate }

export interface CompanyTypeView extends BaseType, CompanyBaseType {
  logo: string | null
}

export interface CompanyTypeLogo {
  file: object
}
