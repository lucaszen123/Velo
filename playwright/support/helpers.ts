export function generateOrderCode() {
  const prefix = 'VLO'

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let randomPart = ''

  let i = 0
  while (i < 6) {
      const randomIndex = Math.floor(Math.random() * chars.length)
      randomPart += chars[randomIndex]
      i++
  }

  return `${prefix}-${randomPart}`
}