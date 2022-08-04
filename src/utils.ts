import { Gender } from './models'
import countries from './countries.json'
import provinces from './vn-provinces.json'

interface Country {
  iso: string,
  official_name: string,
}

export function extractBirthplace(idNumber: string) {
  const code = idNumber.slice(0, 3)
  const nCode = parseInt(code)
  if (isNaN(nCode)) {
    return '<invalid>'
  }
  if (code[0] === '0') {
    return (provinces as Record<string, string>)[nCode.toString()] || '<invalid>'
  }
  else {
    // Ref: https://thuvienphapluat.vn/van-ban/Quyen-dan-su/Thong-tu-07-2016-TT-BCA-quy-dinh-chi-tiet-luat-can-cuoc-cong-dan-nghi-dinh-137-2015-ND-CP-304996.aspx
    const data = (countries as Record<string, Country>)[code]
    if (!data) {
      return '<invalid>'
    }
    return data.official_name
  }
}

export function extractGender(idNumber: string) {
  const code = parseInt(idNumber[3])
  return code % 2 ? Gender.Female : Gender.Male
}

export function extractBirthyear(idNumber: string) {
  const code = parseInt(idNumber[3])
  if (isNaN(code)) {
    return NaN
  }
  const base = (Math.floor(code / 2) + 19) * 100
  const year = parseInt(idNumber.slice(4, 6))
  return base + year
}
