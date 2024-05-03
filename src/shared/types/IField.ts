import { Knight } from './knight'

export interface IField {
  label: string
  value: keyof Knight
  type:
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
}

export interface IFieldAttibutes {
  label: string
  value: keyof Knight['attributes']
  type:
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
}
