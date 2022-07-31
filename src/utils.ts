import ky from 'ky'
import { mask } from 'superstruct'
import { ProvinceSchema } from './models'

export async function extractBirthplace(idNumber: string) {
  const code = idNumber.slice(0, 3)
  if (code[0] !== '0') {
    // TODO: Handle code for foreign countries. Ref: https://thuvienphapluat.vn/van-ban/Quyen-dan-su/Thong-tu-07-2016-TT-BCA-quy-dinh-chi-tiet-luat-can-cuoc-cong-dan-nghi-dinh-137-2015-ND-CP-304996.aspx
    return '<outside-vietnam>'
  }
  const nCode = parseInt(code)
  if (isNaN(nCode)) {
    return '<invalid>'
  }
  const url = `https://provinces.open-api.vn/api/p/${nCode}`
  try {
    const rdata = await ky.get(url).json()
    const province = mask(rdata, ProvinceSchema)
    return province.name
  } catch (e) {
    console.debug(e)
    return '<lookup-failed>'
  }
}
