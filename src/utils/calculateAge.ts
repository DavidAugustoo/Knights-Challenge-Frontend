import { differenceInYears, parseISO } from 'date-fns'

export function calculateAge(birthday: string) {
  const birthdate = parseISO(birthday)
  return differenceInYears(new Date(), birthdate)
}
