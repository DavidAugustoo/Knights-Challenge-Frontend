import { useState } from 'react'
import { toast } from 'react-toastify'

import { Knight } from '@shared/types/knight'

import { PencilSimple } from '@phosphor-icons/react'
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

interface EditDialogProps {
  data: Knight
  handleEditKnight: (id: string, newNickname: string) => Promise<boolean>
}

export function EditDialog({ data, handleEditKnight }: EditDialogProps) {
  const [nickname, setNickname] = useState(data.nickname)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [open, setOpen] = useState(false)

  const saveChanges = async () => {
    if (nickname.trim() === '') {
      toast.warn('O nickname não pode estar vazio.')
      return
    }
    setIsSubmitting(true)
    try {
      const isSuccess = await handleEditKnight(data._id as string, nickname)
      setOpen(!isSuccess)
    } catch (error) {
      console.error('Erro ao atualizar o cavaleiro:', error)
      toast.error('Falha ao atualizar o cavaleiro.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <IconButton onClick={() => setOpen(true)}>
          <PencilSimple size={18} weight="fill" />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Editar Cavaleiro</Dialog.Title>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Nickname
            </Text>
            <TextField.Root
              placeholder={nickname}
              onInput={(e) => setNickname(e.currentTarget.value)}
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" disabled={isSubmitting}>
              Cancelar
            </Button>
          </Dialog.Close>

          <Button onClick={saveChanges} disabled={isSubmitting}>
            Salvar
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
