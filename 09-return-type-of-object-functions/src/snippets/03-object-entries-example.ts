interface User {
  id: string;
  name: string;
}

const user = {
  id: '123',
  name: 'John',
  extraProp: 'extra'
} as User

const entries = Object.entries(user)
const entriesAssigned: Array<[keyof User, User[keyof User]]> = Object.entries(user)
