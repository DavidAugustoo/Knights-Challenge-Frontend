import { IField, IFieldWeapons } from '@shared/types/IField'
import { Knight } from '@shared/types/knight'
import { Weapon } from '@shared/types/weapon'

import { Button, Flex, Text, TextField } from '@radix-ui/themes'

interface WeaponsTabProps extends IFieldWeapons {
  formData: Weapon
  handleChangeWeapon: (fieldName: string, value: string) => void
  errors: {
    [key: string]: string
  }
  handleSubmitWeapon: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

export function WeaponsTab({
  label,
  type,
  value,
  formData,
  handleChangeWeapon,
  errors,
}: WeaponsTabProps) {
  return (
    <Flex direction="column" gap="3" key={label} mb={'4'}>
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          {label}
        </Text>
        <TextField.Root
          type={type}
          name={value}
          value={formData[value] as string}
          onChange={(e) => {
            handleChangeWeapon(value, e.target.value)
          }}
        />
        {errors[value] && (
          <Text color="ruby" size={'2'}>
            {errors[value]}*
          </Text>
        )}
      </label>
    </Flex>
  )
}
