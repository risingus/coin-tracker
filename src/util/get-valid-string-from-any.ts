

export const getValidStringFromAny = (any: any) => {
  return typeof any === 'string'
  && any.length > 0
  && any.trim().length > 0
  ? any
  : ''
}