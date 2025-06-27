
declare global {
  interface Locale {
    countryCode: string
    lat: number | null
    lon: number | null
    name: string
    type: 'Cidade' | 'País'
  }
}

export { }
