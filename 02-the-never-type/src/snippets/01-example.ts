export function throwError(message: string): never {
  throw new Error(message)
}

export function infiniteLoop(): never {
  while (true) {
    console.log('I\'m running forever!')
  }
}
