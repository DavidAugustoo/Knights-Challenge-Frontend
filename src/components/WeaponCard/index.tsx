import { Weapon } from '@shared/types/weapon'

import { Box, Flex, RadioCards, Text } from '@radix-ui/themes'

interface WeaponCard {
  data: Weapon
  index: number
}

export function WeaponCard({ data, index }: WeaponCard) {
  const status = data.equipped ? 'Equipada' : 'Não Equipada'

  return (
    <RadioCards.Item value={index.toString()}>
      <Flex direction="column" width="100%">
        <Text weight="bold">{data.name}</Text>
        <Text>mod: {data.mod}</Text>
        <Text>Attr: {data.attr}</Text>
        <Text>{status}</Text>
      </Flex>
    </RadioCards.Item>
  )
}
