import type { BaseType } from '@/types/_base'

interface BankBaseType {
  name: string
}

export type { BankBaseType as BankTypeCreate }

export interface BankTypeView extends BaseType, BankBaseType {}
