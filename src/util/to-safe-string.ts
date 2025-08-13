

export const toSafeString = (any: unknown) => {
  return typeof any === 'string'
  && any.length > 0
  && any.trim().length > 0
  ? any
  : ''
}