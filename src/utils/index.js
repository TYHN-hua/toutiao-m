// 封装将file对象转换成Base64格式，以promise管理
export const resolveToBase64 = (file) => {
  return new Promise((resolve) => {
    const fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = (e) => {
      resolve(e.target.result)
    }
  })
}
//封装函数：将标准时间转换为年-月-日格式
export const getData = (time) => {
  let d = new Date(time)
  let y = d.getFullYear()
  let m = d.getMonth() + 1
  var s = d.getDate()
  m = m < 9 ? '0' + m : m
  s = s < 9 ? '0' + s : s
  return y + '-' + m + '-' + s
}
