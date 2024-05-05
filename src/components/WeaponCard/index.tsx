import { Weapon } from '@shared/types/weapon'

import { Box, Button, Card, Flex, RadioCards, Text } from '@radix-ui/themes'

interface WeaponCard {
  data: Weapon
  index: number
  handleRemoveWeapon?: (index: number) => void
}

export function WeaponCard({ data, index, handleRemoveWeapon }: WeaponCard) {
  const status = data.equipped ? 'Equipada' : 'Não Equipada'

  return (
    <Card>
      <Flex direction="column" width="100%">
        <Text weight="bold">{data.name}</Text>
        <Text>mod: {data.mod}</Text>
        <Text>Attr: {data.attr}</Text>
        <Text>{status}</Text>
        {handleRemoveWeapon && (
          <Button
            size="1"
            variant="soft"
            color="ruby"
            mt="2"
            onClick={() => handleRemoveWeapon(index)}
          >
            Remover
          </Button>
        )}
      </Flex>
    </Card>
  )
}
