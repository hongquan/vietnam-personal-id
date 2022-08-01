import { Infer, number, object, string } from 'superstruct'

export enum Gender {
  Male,
  Female,
}

export interface PersonalInfo {
  birthplace: string,
  birthyear: number,
  gender: Gender,
  random_number: string,
}

export const ProvinceSchema = object({
  code: number(),
  name: string(),
})

export type Province = Infer<typeof ProvinceSchema>

