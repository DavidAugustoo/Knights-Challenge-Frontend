import { Dispatch, ReactNode } from 'react'

import { Box, Tabs as TabsRadix } from '@radix-ui/themes'

interface TabsProps {
  data: {
    value: string
    title: string
    data: ReactNode
  }[]
  setActiveTab: Dispatch<string>
  defaultActive: string
}

export function Tabs({ data, setActiveTab, defaultActive }: TabsProps) {
  return (
    <TabsRadix.Root defaultValue={defaultActive} onValueChange={setActiveTab}>
      <TabsRadix.List>
        {data.map((tab, index) => {
          return (
            <TabsRadix.Trigger value={tab.value} key={index}>
              {tab.title}
            </TabsRadix.Trigger>
          )
        })}
      </TabsRadix.List>

      <Box pt="3">
        {data.map((tab, index) => {
          return (
            <TabsRadix.Content value={tab.value} key={index}>
              {tab.data}
            </TabsRadix.Content>
          )
        })}
      </Box>
    </TabsRadix.Root>
  )
}
