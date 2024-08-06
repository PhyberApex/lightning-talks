declare const brand: unique symbol
type Brand<T, B> = T & { [brand]: B }

type UserId = Brand<string, 'UserId'>

function createUserID(id: string): UserId {
  // Type assertion to create a branded type
  return id as UserId
}

function deleteUser(id: UserId) {
  // Implementation...
}

const someString: string = 'PhyberApex'
deleteUser(someString)

const validUserId = createUserID(someString)
deleteUser(validUserId)

export {}
