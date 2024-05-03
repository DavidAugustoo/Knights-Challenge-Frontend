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
  Text,
  TextField,
} from '@radix-ui/themes'

export function FormDialog() {
  const [activeTab, setActiveTab] = useState('info')

  const fieldsInfo = [
    { label: 'Nome' },
    { label: 'Nickname' },
    { label: 'Data de aniversário' },
    { label: 'Atributo Principal' },
    { label: 'Estado de vida' },
    { label: 'Ataque' },
    { label: 'Experiência' },
  ]

  const fieldsAttibutes = [
    { label: 'Força' },
    { label: 'Destreza' },
    { label: 'Constituição' },
    { label: 'Inteligência' },
    { label: 'Sabedoria' },
    { label: 'Carisma' },
  ]

  const tabsDialog = [
    {
      value: 'info',
      title: 'Cavaleiros',
      data: (
        <Flex direction="column" gap="3">
          {fieldsInfo.map(({ label }, index) => (
            <label key={index}>
              <Text as="div" size="2" mb="1" weight="bold">
                {label}
              </Text>
              <TextField.Root disabled />
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
          {fieldsAttibutes.map(({ label }, index) => (
            <label key={index}>
              <Text as="div" size="2" mb="1" weight="bold">
                {label}
              </Text>
              <TextField.Root disabled />
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
        <Box minHeight={'530px'}>
          <Tabs
            data={tabsDialog}
            setActiveTab={setActiveTab}
            defaultActive="info"
          />
        </Box>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button>Fechar</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
