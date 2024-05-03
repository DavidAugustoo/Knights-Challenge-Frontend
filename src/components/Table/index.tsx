import { ReactNode } from 'react'

import { Knight } from '@shared/types/knight'

import { DataDialog } from '@components/DataDialog'
import { EditDialog } from '@components/EditDialog'

import { Eye, PencilSimple, Skull } from '@phosphor-icons/react'
import { Box, Flex, IconButton, Table as TableRadix } from '@radix-ui/themes'

interface TableProps {
  columns: string[]
  data: Knight[]
  handleEditKnight: (id: string, newNickname: string) => Promise<boolean>
  handleDeleteKnight: (id: string) => void
}

export function Table({
  data,
  columns,
  handleEditKnight,
  handleDeleteKnight,
}: TableProps) {
  return (
    <TableRadix.Root variant="surface">
      <TableRadix.Header>
        <TableRadix.Row>
          {columns.map((column) => {
            return (
              <TableRadix.ColumnHeaderCell key={column}>
                {column}
              </TableRadix.ColumnHeaderCell>
            )
          })}
        </TableRadix.Row>
      </TableRadix.Header>
      <TableRadix.Body>
        {data.map((knight) => (
          <TableRadix.Row key={knight._id}>
            <TableRadix.RowHeaderCell>{knight.name}</TableRadix.RowHeaderCell>
            <TableRadix.Cell>{knight.birthday}</TableRadix.Cell>
            <TableRadix.Cell>{knight.keyAttribute}</TableRadix.Cell>
            <TableRadix.Cell>{knight.attack}</TableRadix.Cell>
            <TableRadix.Cell>{knight.exp}</TableRadix.Cell>
            <TableRadix.Cell>
              <Flex gap="10px">
                <DataDialog data={knight} />

                <EditDialog data={knight} handleEditKnight={handleEditKnight} />

                <Box>
                  <IconButton
                    color={knight.isDead ? 'gray' : 'ruby'}
                    onClick={() => handleDeleteKnight(knight._id)}
                    disabled={knight.isDead}
                  >
                    <Skull size={18} weight="fill" />
                  </IconButton>
                </Box>
              </Flex>
            </TableRadix.Cell>
          </TableRadix.Row>
        ))}
      </TableRadix.Body>
    </TableRadix.Root>
  )
}
