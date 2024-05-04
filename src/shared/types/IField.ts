import { Knight } from './knight'
import { Weapon } from './weapon'

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

export interface IFieldAttributes {
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

export interface IFieldWeapons {
  label: string
  value: keyof Weapon
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