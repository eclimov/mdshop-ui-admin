import type { BaseType } from '@/types/_base'

interface BankAffiliateBaseType {
  affiliateNumber: string
}

export interface BankAffiliateTypeCreate extends BankAffiliateBaseType {
  bank: string
}

export interface BankAffiliateTypeView extends BaseType, BankAffiliateBaseType {}
