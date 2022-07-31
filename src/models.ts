import { array, assign, defaulted, Infer, number, object, string } from 'superstruct'

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

export const BaseSchema = object({
  code: number(),
  name: string(),
})

export const WardSchema = BaseSchema

export const DistrictShema = assign(BaseSchema, object({
  wards: defaulted(array(WardSchema), []),
}))

export const ProvinceSchema = assign(BaseSchema, object({
  districts: defaulted(array(DistrictShema), []),
}))

export type Base = Infer<typeof BaseSchema>
export type Ward = Infer<typeof WardSchema>
export type District = Infer<typeof DistrictShema>
export type Province = Infer<typeof ProvinceSchema>

