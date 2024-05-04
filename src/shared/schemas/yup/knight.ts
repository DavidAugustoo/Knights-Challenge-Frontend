import * as Yup from 'yup'

export const schemaKnight = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  nickname: Yup.string().required('Nickname é obrigatório'),
  birthday: Yup.string().required('Data de aniversário é obrigatória'),
  keyAttribute: Yup.string().required('Atributo Principal é obrigatório'),
  attributes: Yup.object().shape({
    strength: Yup.number().required('Força é obrigatória').integer(),
    dexterity: Yup.number().required('Destreza é obrigatória').integer(),
    constitution: Yup.number().required('Constituição é obrigatória').integer(),
    intelligence: Yup.number().required('Inteligência é obrigatória').integer(),
    wisdom: Yup.number().required('Sabedoria é obrigatória').integer(),
    charisma: Yup.number().required('Carisma é obrigatório').integer(),
  }),
  weapons: Yup.array().min(1, 'Pelo menos uma arma deve ser especificada'),
})
