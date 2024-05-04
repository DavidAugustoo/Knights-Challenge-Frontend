import { IField, IFieldWeapons } from '@shared/types/IField'
import { Knight } from '@shared/types/knight'
import { Weapon } from '@shared/types/weapon'

import { Button, Flex, Select, Text, TextField } from '@radix-ui/themes'

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
  selectOptions,
  selectDefaultValue,
  errors,
}: WeaponsTabProps) {
  const inputType = selectOptions ? 'select' : 'input'

  return (
    <Flex direction="column" gap="3" key={label} mb={'4'}>
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          {label}
        </Text>

        {inputType == 'input' && (
          <TextField.Root
            type={type}
            name={value}
            value={formData[value] as string}
            onChange={(e) => {
              handleChangeWeapon(value, e.target.value)
            }}
          />
        )}

        {inputType == 'select' && (
          <Select.Root
            size="2"
            defaultValue={selectDefaultValue}
            onValueChange={(e) => {
              handleChangeWeapon(value, e)
            }}
          >
            <Select.Trigger />
            <Select.Content>
              {selectOptions &&
                selectOptions.map(({ title, value }, index) => {
                  return (
                    <Select.Item key={index} value={value}>
                      {title}
                    </Select.Item>
                  )
                })}
            </Select.Content>
          </Select.Root>
        )}

        {errors[value] && (
          <Text color="ruby" size={'2'}>
            {errors[value]}*
          </Text>
        )}
      </label>
    </Flex>
  )
}
