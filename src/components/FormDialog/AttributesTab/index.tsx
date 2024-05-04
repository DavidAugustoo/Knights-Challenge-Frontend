import { IField, IFieldAttributes } from '@shared/types/IField'
import { Knight } from '@shared/types/knight'

import { Flex, Text, TextField } from '@radix-ui/themes'

interface AttributesTab extends IFieldAttributes {
  formData: Knight
  handleChangeAttributes: (fieldName: string, value: string) => void
  errors: {
    [key: string]: string
  }
}

export function AttributeTab({
  formData,
  handleChangeAttributes,
  errors,
  label,
  type,
  value,
}: AttributesTab) {
  return (
    <Flex direction="column" gap="3" key={label} mb={'4'}>
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          {label}
        </Text>
        <TextField.Root
          type={type}
          name={value}
          value={formData.attributes[value].toString()}
          onChange={(e) => handleChangeAttributes(value, e.target.value)}
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
