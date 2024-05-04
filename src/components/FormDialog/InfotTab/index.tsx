import { IField } from '@shared/types/IField'
import { Knight } from '@shared/types/knight'

import { Flex, Text, TextField } from '@radix-ui/themes'

interface InfoTabProps extends IField {
  formData: Knight
  handleChange: (fieldName: string, value: string) => void
  errors: {
    [key: string]: string
  }
}

export function InfoTab({
  label,
  type,
  value,
  formData,
  handleChange,
  errors,
}: InfoTabProps) {
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
            console.log(value)
            handleChange(value, e.target.value)
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
