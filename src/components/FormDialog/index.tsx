import React, { useState } from 'react'

import {
  fieldsAttributes,
  fieldsInfo,
  fieldsWeapons,
} from '@shared/constants/InputsCreateKnight'
import { schemaKnight } from '@shared/schemas/yup/knight'
import { schemaWeapon } from '@shared/schemas/yup/weapon'
import { Knight } from '@shared/types/knight'
import { Weapon } from '@shared/types/weapon'

import { Tabs } from '@components/Tabs'
import { WeaponCard } from '@components/WeaponCard'

import { AttributeTab } from './AttributesTab'
import { InfoTab } from './InfotTab'
import { WeaponsTab } from './WeaponsTab '

import { Plus } from '@phosphor-icons/react'
import {
  Dialog,
  Button,
  Text,
  TextField,
  Flex,
  Box,
  RadioCards,
} from '@radix-ui/themes'

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

  const [formDataWeapon, setFormDataWeapon] = useState<Weapon>({
    name: '',
    attr: 'strength',
    mod: 0,
    equipped: false,
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [errorsWeapon, setErrorsWeapon] = useState<{ [key: string]: string }>(
    {},
  )

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

  const handleChangeWeapon = (fieldName: string, value: string) => {
    console.log('to sendo chamado aqui')
    setFormDataWeapon((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }))

    if (errorsWeapon[fieldName]) {
      setErrorsWeapon((prevErrors) => {
        const newErrors = { ...prevErrors }
        delete newErrors[fieldName]
        return newErrors
      })
    }
  }

  const handleSubmit = async () => {
    console.log('Fui acionado, mas nao deveria')

    try {
      await schemaKnight.validate(formData, { abortEarly: false })

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

  const handleSubmitWeapon = async () => {
    try {
      await schemaWeapon.validate(formDataWeapon, { abortEarly: false })

      console.log('Formulário de arma válido, envie os dados:', formDataWeapon)

      setErrorsWeapon({})

      // Adicionando a nova arma ao array de armas no formData
      setFormData((prevState) => ({
        ...prevState,
        weapons: [...prevState.weapons, formDataWeapon],
      }))

      setFormDataWeapon({
        name: '',
        attr: 'strength',
        mod: 0,
        equipped: false,
      })

      console.log(formData)
    } catch (err: any) {
      const newErrors: { [key: string]: string } = {}

      err.inner.forEach((error: any) => {
        newErrors[error.path] = error.message
      })

      console.log(newErrors)

      setErrorsWeapon(newErrors)
    }
  }

  const handleCancelRegister = async () => {
    setErrorsWeapon({})
    setErrors({})

    setFormData((prevState) => ({
      ...prevState,
      weapons: [...prevState.weapons, formDataWeapon],
    }))

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

    setOpen(false)
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

        <Box minHeight={'530px'}>
          <Tabs
            data={[
              {
                value: 'info',
                title: 'Informações',
                data: fieldsInfo.map(
                  ({
                    label,
                    type,
                    value,
                    selectOptions,
                    selectDefaultValue,
                  }) => {
                    return (
                      <InfoTab
                        key={label}
                        label={label}
                        selectOptions={selectOptions}
                        selectDefaultValue={selectDefaultValue}
                        type={type}
                        value={value}
                        formData={formData}
                        errors={errors}
                        handleChange={handleChange}
                      />
                    )
                  },
                ),
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
                data: (
                  <div>
                    {fieldsWeapons.map(
                      ({
                        label,
                        type,
                        value,
                        selectDefaultValue,
                        selectOptions,
                      }) => {
                        return (
                          <WeaponsTab
                            key={label}
                            label={label}
                            selectOptions={selectOptions}
                            selectDefaultValue={selectDefaultValue}
                            type={type}
                            value={value}
                            formData={formDataWeapon}
                            errors={errorsWeapon}
                            handleChangeWeapon={handleChangeWeapon}
                            handleSubmitWeapon={handleSubmitWeapon}
                          />
                        )
                      },
                    )}

                    <Flex gap="3" mt="4" justify="end">
                      <Button
                        onClick={() => handleSubmitWeapon()}
                        disabled={Object.keys(errorsWeapon).length > 0}
                      >
                        Adicionar arma
                      </Button>
                    </Flex>

                    <Flex direction="column" gap="3">
                      <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                          Armas Cadastradas
                        </Text>
                        <RadioCards.Root
                          defaultValue="1"
                          columns={{ initial: '0', sm: '3' }}
                        >
                          {formData.weapons.map((weapon, index) => (
                            <WeaponCard
                              key={index}
                              data={weapon}
                              index={index}
                            />
                          ))}
                        </RadioCards.Root>
                      </label>
                    </Flex>
                  </div>
                ),
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
              onClick={() => handleCancelRegister()}
            >
              Cancelar
            </Button>
          </Dialog.Close>
          <Button type="submit" onClick={() => handleSubmit()}>
            Cadastrar
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
