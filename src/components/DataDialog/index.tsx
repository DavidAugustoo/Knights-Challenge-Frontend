import { useState } from 'react'

import { Knight } from '@shared/types/knight'

import { Tabs } from '@components/Tabs'
import { WeaponCard } from '@components/WeaponCard'

import { Eye } from '@phosphor-icons/react'
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

interface DataDialogProps {
  data: Knight
}

export function DataDialog({ data }: DataDialogProps) {
  const [activeTab, setActiveTab] = useState('info')

  const fieldsInfo = [
    { label: 'Nome', value: data.name },
    { label: 'Nickname', value: data.nickname },
    { label: 'Data de aniversário', value: data.birthday },
    { label: 'Atributo Principal', value: data.keyAttribute },
    { label: 'Estado de vida', value: data.isDead ? 'Morto' : 'Vivo' },
    { label: 'Ataque', value: data.attack },
    { label: 'Experiência', value: data.exp },
  ]

  const fieldsAttibutes = [
    { label: 'Força', value: data.attributes.strength },
    { label: 'Destreza', value: data.attributes.dexterity },
    { label: 'Constituição', value: data.attributes.constitution },
    { label: 'Inteligência', value: data.attributes.intelligence },
    { label: 'Sabedoria', value: data.attributes.wisdom },
    { label: 'Carisma', value: data.attributes.charisma },
  ]

  const tabsDialog = [
    {
      value: 'info',
      title: 'Informações',
      data: (
        <Flex direction="column" gap="3">
          {fieldsInfo.map(({ label, value }, index) => (
            <label key={index}>
              <Text as="div" size="2" mb="1" weight="bold">
                {label}
              </Text>
              <TextField.Root defaultValue={value} disabled />
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
          {fieldsAttibutes.map(({ label, value }, index) => (
            <label key={index}>
              <Text as="div" size="2" mb="1" weight="bold">
                {label}
              </Text>
              <TextField.Root defaultValue={value} disabled />
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
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Armas
            </Text>
            <RadioCards.Root
              defaultValue="1"
              columns={{ initial: '0', sm: '3' }}
            >
              {data.weapons.map((weapon, index) => (
                <WeaponCard key={index} data={weapon} index={index} />
              ))}
            </RadioCards.Root>
          </label>
        </Flex>
      ),
    },
  ]

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton aria-label="Ver detalhes">
          <Eye size={18} weight="fill" />
        </IconButton>
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
