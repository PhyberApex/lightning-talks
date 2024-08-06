function throwError(message: string): never {
  throw new Error(message)
}

function infiniteLoop(): never {
  while (true) {
    console.log('I\'m running forever!')
  }
}
