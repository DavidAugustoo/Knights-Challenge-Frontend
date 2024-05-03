import { Dispatch, ReactNode, SetStateAction } from 'react'

import { Knight } from './knight'

export interface IKnightProvider {
  knights: Knight[] | undefined
  isLoading: boolean
  setKnights: Dispatch<SetStateAction<Knight[] | undefined>>
  getKnights: () => void
}

export interface IChildrenBannerProviderProps {
  children: ReactNode
}
