import { useState } from 'react'

import { Knight } from '@shared/types/knight'

import { Tabs } from '@components/Tabs'
import { WeaponCard } from '@components/WeaponCard'

import { Eye, Plus } from '@phosphor-icons/react'
import {
  Box,
  Button,
  Dialog,
  Flex,
  IconButton,
  RadioCards,
  Slider,
  Text,
  TextField,
} from '@radix-ui/themes'

export function FormDialog() {
  const [activeTab, setActiveTab] = useState('info')

  interface Ifield {
    label: string
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

  const fieldsInfo: Ifield[] = [
    { label: 'Nome', type: 'text' },
    { label: 'Nickname', type: 'text' },
    { label: 'Data de aniversário', type: 'date' },
    { label: 'Atributo Principal', type: 'text' },
  ]

  const fieldsAttibutes: Ifield[] = [
    { label: 'Força', type: 'number' },
    { label: 'Destreza', type: 'number' },
    { label: 'Constituição', type: 'number' },
    { label: 'Inteligência', type: 'number' },
    { label: 'Sabedoria', type: 'number' },
    { label: 'Carisma', type: 'number' },
  ]

  const tabsDialog = [
    {
      value: 'info',
      title: 'Informações',
      data: (
        <Flex direction="column" gap="3">
          {fieldsInfo.map(({ label, type }, index) => (
            <label key={index}>
              <Text as="div" size="2" mb="1" weight="bold">
                {label}
              </Text>
              <TextField.Root type={type} />
            </label>
          ))}
        </Flex>
      ),
    },
    {
      value: 'attributes',
      title: 'Atributos',
      data: (
        <Flex direction="column" gap="3">
          {fieldsAttibutes.map(({ label, type }, index) => (
            <label key={index}>
              <Text as="div" size="2" mb="1" weight="bold">
                {label}
              </Text>
              <TextField.Root type={type} defaultValue={0} />
            </label>
          ))}
        </Flex>
      ),
    },
    {
      value: 'weapons',
      title: 'Armas',
      data: (
        <Flex direction="column" gap="3">
          in progress
        </Flex>
      ),
    },
  ]

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="3" variant="solid">
          <Plus size={22} weight="bold" /> <Text>Cadastrar Caveleiro</Text>
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Cadastrar Cavaleiro</Dialog.Title>

        <Box minHeight={'530px'}>
          <Tabs
            data={tabsDialog}
            setActiveTab={setActiveTab}
            defaultActive="info"
          />
        </Box>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancelar
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Cadastrar</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
