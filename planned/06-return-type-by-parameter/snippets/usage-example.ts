import { get } from './fetch-function'

const tasks = await get('/tasks') // Will be typed as Task[]
const users = await get('/users') // Will be typed as User[]

// TypeScript will provide autocompletion and type checking:
tasks.forEach(task => console.log(task.name))
users.forEach(user => console.log(user.password))
