import { IField } from '@shared/types/IField'
import { Knight } from '@shared/types/knight'

import { Flex, Select, Text, TextField } from '@radix-ui/themes'

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
  selectOptions,
  formData,
  handleChange,
  errors,
  selectDefaultValue,
}: InfoTabProps) {
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
              handleChange(value, e.target.value)
            }}
          />
        )}

        {inputType == 'select' && (
          <Select.Root
            size="2"
            defaultValue={selectDefaultValue}
            onValueChange={(e) => {
              handleChange(value, e)
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
