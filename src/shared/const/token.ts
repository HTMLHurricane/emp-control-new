type TToken = {
  set: (value: any) => void
  get: () => string | null
  remove: (value: any) => void
}

export const TOKEN_KEY = 'emp-tkn'

export const TOKEN: TToken = {
  set: value => localStorage.setItem(TOKEN_KEY, value),
  get: () => localStorage.getItem(TOKEN_KEY),
  remove: value => localStorage.removeItem(value),
}
