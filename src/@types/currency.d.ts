
declare global {
  interface Currency {
    code: string
    name: string
    from?: {
      code: string
      name: string
    }
  }
}

export { }
