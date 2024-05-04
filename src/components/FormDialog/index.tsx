import React, { useState } from 'react'

import {
  fieldsAttributes,
  fieldsInfo,
} from '@shared/constants/InputsCreateKnight'
import { schema } from '@shared/schemas/yup/CreateKnight'
import { Knight } from '@shared/types/knight'

import { Tabs } from '@components/Tabs'

import { AttributeTab } from './AttributesTab'
import { InfoTab } from './InfotTab'

import { Plus } from '@phosphor-icons/react'
import { Dialog, Button, Text, TextField, Flex, Box } from '@radix-ui/themes'
import { error } from 'console'

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
                      <InfoTab
                        key={label}
                        label={label}
                        type={type}
                        value={value}
                        formData={formData}
                        errors={errors}
                        handleChange={handleChange}
                      />
                    )
                  }),
                },
                {
                  value: 'attributes',
                  title: 'Atributos',
                  data: fieldsAttributes.map(({ label, type, value }) => {
                    return (
                      <AttributeTab
                        key={label}
                        label={label}
                        type={type}
                        value={value}
                        formData={formData}
                        errors={errors}
                        handleChangeAttributes={handleChangeAttributes}
                      />
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
