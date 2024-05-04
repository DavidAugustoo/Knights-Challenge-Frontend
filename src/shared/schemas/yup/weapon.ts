import * as Yup from 'yup'

export const schemaWeapon = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  mod: Yup.number().required('Mod é obrigatória').integer(),
  attr: Yup.string().required('Atributo é obrigatório'),
  equipped: Yup.boolean().required('Status é obrigatório'),
})
