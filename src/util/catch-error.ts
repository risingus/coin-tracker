

async function catchError<Generic>(promise: Promise<Generic>): Promise<[undefined, Generic] | [Error]> {
  return promise.then((data) => {
    return [undefined, data] as [undefined, Generic]
  })
    .catch((error) => {
      return [error]
    })
}

export { catchError }