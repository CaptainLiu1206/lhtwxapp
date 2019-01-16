function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  date = new Date(date)
  const year = date.getFullYear()
  const month = formatNumber(date.getMonth() + 1)
  const day = formatNumber(date.getDate())

  const hour = formatNumber(date.getHours())
  const minute = formatNumber(date.getMinutes())
  const second = formatNumber(date.getSeconds())

  // const t1 = [year, month, day].map(formatNumber).join('/')
  // const t2 = [hour, minute, second].map(formatNumber).join(':')

  // return `${t1} ${t2}`
  return { year, month, day, hour, minute, second }
}

export function getUperDay (day) {
  const compare = ['一', '二', '三', '四', '五', '六', '日']
  return `周${compare[day]}`
}

export default {
  formatNumber,
  formatTime,
  getUperDay
}
