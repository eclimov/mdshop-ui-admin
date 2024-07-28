import type { CompanyEmployeeTypeView } from '@/types/companyEmployee'
import type { CompanyTypeView } from '@/types/company'
import type { CompanyAddressTypeView } from '@/types/companyAddress'
import type { BaseType } from '@/types/_base'

interface InvoiceBaseType {
  attachedDocument: string
  deliveryDate: string
  orderDate: string
  recipientName: string
}

export interface InvoiceTypeCreate extends InvoiceBaseType {
  approvedByEmployee: string
  buyer: string
  carrier: string
  loadingPoint: string
  processedByEmployee: string
  seller: string
  unloadingPoint: string
}

export interface InvoiceTypeView extends BaseType, InvoiceBaseType {
  approvedByEmployee: CompanyEmployeeTypeView
  buyer: CompanyTypeView
  carrier: CompanyTypeView
  loadingPoint: CompanyAddressTypeView
  processedByEmployee: CompanyEmployeeTypeView
  seller: CompanyTypeView
  unloadingPoint: CompanyAddressTypeView
}
