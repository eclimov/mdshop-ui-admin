import type { BaseType } from '@/types/_base'

interface CompanyEmployeeBaseType {
  name: string
  position: 'Consultant' | 'Director'
}

export interface CompanyEmployeeTypeCreate extends CompanyEmployeeBaseType {
  company: string
}

export interface CompanyEmployeeTypeView extends BaseType, CompanyEmployeeBaseType {
  created_at: string
  id: number
}
