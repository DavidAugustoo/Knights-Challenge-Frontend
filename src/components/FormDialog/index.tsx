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

import { Plus, WarningCircle } from '@phosphor-icons/react'
import {
  Dialog,
  Button,
  Text,
  TextField,
  Flex,
  Box,
  RadioCards,
} from '@radix-ui/themes'
import axios from 'axios'

export function FormDialog() {
  const [activeTab, setActiveTab] = useState('info')
  const [open, setOpen] = useState(false)

  const [formData, setFormData] = useState<Knight>({
    name: '',
    nickname: '',
    birthday: '',
    keyAttribute: 'strength',
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
        [fieldName]: parseInt(value),
      },
    }))
  }

  const handleChangeWeapon = (
    fieldName: string,
    value: string | boolean,
    type: string,
  ) => {
    if (type === 'number') {
      setFormDataWeapon((prevData) => ({
        ...prevData,
        [fieldName]: parseInt(value as string),
      }))
    } else {
      setFormDataWeapon((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }))
    }

    if (errorsWeapon[fieldName]) {
      setErrorsWeapon((prevErrors) => {
        const newErrors = { ...prevErrors }
        delete newErrors[fieldName]
        return newErrors
      })
    }
  }

  const handleSubmit = async () => {
    console.log('formario enviado', formData)

    try {
      await schemaKnight.validate(formData, { abortEarly: false })

      setErrors({})

      setOpen(false)

      console.log('formario enviado', formData)

      await axios.post('/api/knights', formData)

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

      setOpen(true)

      alert('Knight added successfully')
    } catch (error) {
      setOpen(false)

      console.log('erro', error)
      alert('Failed to add knight')
    }
  }
  const handleSubmitWeapon = async () => {
    try {
      await schemaWeapon.validate(formDataWeapon, { abortEarly: false })

      setErrorsWeapon({})

      setFormData((prevState) => ({
        ...prevState,
        weapons: [...prevState.weapons, formDataWeapon],
      }))

      setErrors((prevErrors) => {
        const { weapons, ...restErrors } = prevErrors
        return restErrors
      })
      setFormDataWeapon({
        name: '',
        attr: 'strength',
        mod: 0,
        equipped: false,
      })
    } catch (err: any) {
      const newErrors: { [key: string]: string } = {}

      err.inner.forEach((error: any) => {
        newErrors[error.path] = error.message
      })

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

  const handleRemoveWeapon = (index: number) => {
    setFormData((prevState) => ({
      ...prevState,
      weapons: prevState.weapons.filter((_, i) => i !== index),
    }))
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
                title: (
                  <Flex gap={'5px'} align={'center'}>
                    <Text color={errors['weapons'] ? 'ruby' : 'gray'}>
                      Armas
                    </Text>
                    {errors['weapons'] && (
                      <WarningCircle color={'#D45268'} size={18} />
                    )}
                  </Flex>
                ),
                data: (
                  <div>
                    {fieldsWeapons.map(
                      ({
                        label,
                        type,
                        value,
                        selectDefaultValue,
                        selectOptions,
                        isSwitch,
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
                            isSwitch={isSwitch}
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
                        {errors['weapons'] && (
                          <Text as="div" size="2" mb="1" color="ruby">
                            Pelo menos uma arma deve ser cadastrada*
                          </Text>
                        )}
                      </label>
                      <Flex width={'auto'} wrap={'wrap'} gap={'3'}>
                        {formData.weapons.map((weapon, index) => (
                          <WeaponCard
                            key={index}
                            data={weapon}
                            index={index}
                            handleRemoveWeapon={handleRemoveWeapon}
                          />
                        ))}
                      </Flex>
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
