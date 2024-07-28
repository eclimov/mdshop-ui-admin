import type { BaseType } from '@/types/_base'

interface CompanyAddressBaseType {
  address: string
  juridic: boolean
}

export interface CompanyAddressTypeCreate extends CompanyAddressBaseType {
  company: string
}

export interface CompanyAddressTypeView extends BaseType, CompanyAddressBaseType {}
