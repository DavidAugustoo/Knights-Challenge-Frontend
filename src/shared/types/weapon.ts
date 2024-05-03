export interface Weapon {
  name: string
  mod: number
  attr:
    | 'strength'
    | 'dexterity'
    | 'constitution'
    | 'intelligence'
    | 'wisdom'
    | 'charisma'
  equipped: boolean
}
