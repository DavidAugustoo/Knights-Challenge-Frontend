import { IField, IFieldAttributes } from '@shared/types/IField'

export const fieldsInfo: IField[] = [
  { label: 'Nome', type: 'text', value: 'name' },
  { label: 'Nickname', type: 'text', value: 'nickname' },
  {
    label: 'Data de aniversário',
    type: 'date',
    value: 'birthday',
  },
  { label: 'Atributo Principal', type: 'text', value: 'keyAttribute' },
]

export const fieldsAttributes: IFieldAttributes[] = [
  { label: 'Força', type: 'number', value: 'strength' },
  { label: 'Destreza', type: 'number', value: 'dexterity' },
  {
    label: 'Constituição',
    type: 'number',
    value: 'constitution',
  },
  {
    label: 'Inteligência',
    type: 'number',
    value: 'intelligence',
  },
  { label: 'Sabedoria', type: 'number', value: 'wisdom' },
  { label: 'Carisma', type: 'number', value: 'charisma' },
]
