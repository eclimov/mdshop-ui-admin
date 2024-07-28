import type { CompanyTypeView } from '@/types/company'
import type { BaseType } from '@/types/_base'

interface UserBaseType {
  email: string
}

export interface UserTypeCreate extends UserBaseType{
  password: string
  company: string
}

export interface UserTypeView extends BaseType, UserBaseType {
  password?: string
  company: CompanyTypeView
}
