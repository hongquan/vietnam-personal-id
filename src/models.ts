
export enum Gender {
  Male,
  Female,
}

export enum Language {
  EN = 'en',
  VI = 'vi',
}

export interface PersonalInfo {
  birthplace: string,
  birthyear: number,
  gender: Gender,
  random_number: string,
}
