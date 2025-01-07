type Func = () => {
  id: string;
}

const func: Func = () => {
  return {
    id: '123',
    name: 'Hello!', // No error on an excess property!
  }
}

// TypeScript allows this
const result = func()
console.log(result.id)
console.log(result.name)
