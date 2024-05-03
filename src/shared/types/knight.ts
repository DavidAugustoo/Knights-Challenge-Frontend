import { Attributes } from './attibutes'
import { Weapon } from './weapon'

export interface Knight {
  _id?: string
  name: string
  nickname: string
  birthday: string
  attributes: Attributes
  keyAttribute: string
  weapons: Weapon[]
  isDead?: boolean
  attack?: number
  exp?: number
}
