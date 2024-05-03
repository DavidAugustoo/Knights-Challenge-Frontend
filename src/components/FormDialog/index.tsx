import React, { useState } from 'react'

import {
  fieldsAttibutes,
  fieldsInfo,
} from '@shared/constants/InputsCreateKnight'
import { Knight } from '@shared/types/knight'

import { Tabs } from '@components/Tabs'

import { Plus } from '@phosphor-icons/react'
import { Dialog, Button, Text, TextField, Flex, Box } from '@radix-ui/themes'
import * as Yup from 'yup'

const schema = Yup.object().shape({
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
})

export function FormDialog() {
  const [activeTab, setActiveTab] = useState('info')
  const [open, setOpen] = useState(false)

  const [formData, setFormData] = useState<Knight>({
    name: '',
    nickname: '',
    birthday: '',
    keyAttribute: '',
    attributes: {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0,
    },
    weapons: [],
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleChange = (fieldName: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }))

    if (errors[fieldName]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors }
        delete newErrors[fieldName]
        return newErrors
      })
    }
  }

  const handleChangeAttributes = (fieldName: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      attributes: {
        ...prevData.attributes,
        [fieldName]: value,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await schema.validate(formData, { abortEarly: false })
      console.log('Formulário válido, envie os dados:', formData)
      setErrors({})
      setOpen(false)
      setFormData({
        name: '',
        nickname: '',
        birthday: '',
        keyAttribute: '',
        attributes: {
          strength: 0,
          dexterity: 0,
          constitution: 0,
          intelligence: 0,
          wisdom: 0,
          charisma: 0,
        },
        weapons: [],
      })
    } catch (err: any) {
      const newErrors: { [key: string]: string } = {}
      err.inner.forEach((error: any) => {
        newErrors[error.path] = error.message
      })
      setErrors(newErrors)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button size="3" variant="solid">
          <Plus size={22} weight="bold" /> <Text>Cadastrar Cavaleiro</Text>
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Cadastrar Cavaleiro</Dialog.Title>

        <form onSubmit={handleSubmit}>
          <Box minHeight={'530px'}>
            <Tabs
              data={[
                {
                  value: 'info',
                  title: 'Informações',
                  data: fieldsInfo.map(({ label, type, value }) => {
                    return (
                      <Flex direction="column" gap="3" key={label} mb={'4'}>
                        <label>
                          <Text as="div" size="2" mb="1" weight="bold">
                            {label}
                          </Text>
                          <TextField.Root
                            type={type}
                            name={value}
                            value={formData[value] as string}
                            onChange={(e) => {
                              console.log(value)
                              handleChange(value, e.target.value)
                            }}
                          />
                          {errors[value] && (
                            <Text color="ruby" size={'2'}>
                              {errors[value]}*
                            </Text>
                          )}
                        </label>
                      </Flex>
                    )
                  }),
                },
                {
                  value: 'attributes',
                  title: 'Atributos',
                  data: fieldsAttibutes.map(({ label, type, value }) => {
                    return (
                      <Flex direction="column" gap="3" key={label} mb={'4'}>
                        <label>
                          <Text as="div" size="2" mb="1" weight="bold">
                            {label}
                          </Text>
                          <TextField.Root
                            type={type}
                            name={value}
                            value={formData.attributes[value].toString()}
                            onChange={(e) =>
                              handleChangeAttributes(value, e.target.value)
                            }
                          />
                          {errors[value] && (
                            <Text color="ruby" size={'2'}>
                              {errors[value]}*
                            </Text>
                          )}
                        </label>
                      </Flex>
                    )
                  }),
                },
                {
                  value: 'weapons',
                  title: 'Armas',
                  data: <p>In process</p>,
                },
              ]}
              setActiveTab={setActiveTab}
              defaultActive="info"
            />
          </Box>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button
                variant="soft"
                color="gray"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
            </Dialog.Close>
            <Button type="submit" disabled={Object.keys(errors).length > 0}>
              Cadastrar
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  )
}
