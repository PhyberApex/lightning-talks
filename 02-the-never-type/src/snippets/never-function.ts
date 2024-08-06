function throwError(message: string): never {
  throw new Error(message)
}

function infiniteLoop(): never {
  while (true) {}
}
