import { Knight } from './knight'
import { Weapon } from './weapon'

type FieldType =
  | 'number'
  | 'search'
  | 'time'
  | 'text'
  | 'hidden'
  | 'tel'
  | 'url'
  | 'email'
  | 'date'
  | 'datetime-local'
  | 'month'
  | 'password'
  | 'week'
  | undefined

interface IFieldBase<T> {
  label: string
  value: keyof T
  type: FieldType
}

export interface IField extends IFieldBase<Knight> {
  selectOptions?: {
    title: string
    value: string
  }[]
  selectDefaultValue?: string
}

export interface IFieldAttributes extends IFieldBase<Knight['attributes']> {}

export interface IFieldWeapons extends IFieldBase<Weapon> {
  selectOptions?: {
    title: string
    value: string
  }[]
  selectDefaultValue?: string
  isSwitch?: boolean
}
