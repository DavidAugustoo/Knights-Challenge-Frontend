import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Knight } from '@shared/types/knight'

import { FormDialog } from '@components/FormDialog'
import { Table } from '@components/Table'
import { Tabs } from '@components/Tabs'

import { Container, Flex } from '@radix-ui/themes'

const Home: React.FC = () => {
  const [knights, setKnights] = useState<Knight[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState('knights')

  const getKnights = useCallback(async (filter?: string) => {
    setIsLoading(true)
    let url = '/api/knights'
    if (filter) {
      url += `?filter=${filter}`
    }
    try {
      const response = await fetch(url)
      const data = await response.json()
      setKnights(data)
    } catch (error) {
      console.error('Failed to fetch knights:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (activeTab === 'hallOfHeros') {
      getKnights('heros')
    } else {
      getKnights()
    }
  }, [getKnights, activeTab])

  const handleDiedKnight = async (id: string) => {
    try {
      const response = await fetch(`/api/knights/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.message || 'Failed to delete the knight.')
      }

      toast.success('Status de vida atualizada com sucesso')

      getKnights(activeTab === 'hallOfHeros' ? 'heros' : undefined)
    } catch (error: any) {
      console.error('Failed to delete knight:', error)
      toast.error(error.message)
    }
  }

  const handleEditKnight = async (id: string, newNickname: string) => {
    try {
      const response = await fetch(`/api/knights/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname: newNickname }),
      })
      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.message || 'Failed to update the knight.')
      }
      toast.success('Cavaleiro atualizado com sucesso')

      getKnights(activeTab === 'hallOfHeros' ? 'heros' : undefined)

      return true
    } catch (error: any) {
      console.error('Failed to update knight:', error)
      toast.error(error.message)

      return false
    }
  }

  const columns = [
    'Nome',
    'Idade',
    'Atributo',
    'Ataque',
    'Experiência',
    'Ações',
  ]

  const tabsHome = [
    {
      value: 'knights',
      title: 'Cavaleiros',
      data: (
        <Table
          isLoading={isLoading}
          columns={columns}
          data={knights}
          handleDeleteKnight={handleDiedKnight}
          handleEditKnight={handleEditKnight}
        />
      ),
    },
    {
      value: 'hallOfHeros',
      title: 'Hall of Heros',
      data: (
        <Table
          isLoading={isLoading}
          columns={columns}
          data={knights}
          handleDeleteKnight={handleDiedKnight}
          handleEditKnight={handleEditKnight}
        />
      ),
    },
  ]

  return (
    <Container minHeight={'80vh'}>
      <Flex gap="20px" direction="column" pt={'30vh'}>
        <Tabs
          data={tabsHome}
          setActiveTab={setActiveTab}
          defaultActive="knights"
        />
        <FormDialog getKnights={getKnights} />
      </Flex>
    </Container>
  )
}

export default Home
