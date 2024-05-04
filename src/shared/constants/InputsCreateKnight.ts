import { IField, IFieldAttributes, IFieldWeapons } from '@shared/types/IField'

export const fieldsInfo: IField[] = [
  { label: 'Nome', type: 'text', value: 'name' },
  { label: 'Nickname', type: 'text', value: 'nickname' },
  {
    label: 'Data de aniversário',
    type: 'date',
    value: 'birthday',
  },
  {
    label: 'Atributo Principal',
    type: 'text',
    value: 'keyAttribute',
    selectOptions: [
      {
        title: 'Força',
        value: 'strength',
      },
      {
        title: 'Destreza',
        value: 'dexterity',
      },
      {
        title: 'Constituição',
        value: 'constitution',
      },
      {
        title: 'Inteligência',
        value: 'intelligence',
      },
      {
        title: 'Sabedoria',
        value: 'wisdom',
      },
      {
        title: 'Carisma',
        value: 'charisma',
      },
    ],
    selectDefaultValue: 'strength',
  },
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

export const fieldsWeapons: IFieldWeapons[] = [
  { label: 'Nome', type: 'text', value: 'name' },
  { label: 'Mod', type: 'number', value: 'mod' },
  {
    label: 'Atributo',
    type: 'text',
    value: 'attr',
    selectOptions: [
      {
        title: 'Força',
        value: 'strength',
      },
      {
        title: 'Destreza',
        value: 'dexterity',
      },
      {
        title: 'Constituição',
        value: 'constitution',
      },
      {
        title: 'Inteligência',
        value: 'intelligence',
      },
      {
        title: 'Sabedoria',
        value: 'wisdom',
      },
      {
        title: 'Carisma',
        value: 'charisma',
      },
    ],
    selectDefaultValue: 'strength',
  },
  { label: 'Status', type: 'text', value: 'equipped', isSwitch: true },
]
