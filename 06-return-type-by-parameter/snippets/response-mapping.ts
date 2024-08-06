import type { Task, User } from './data-structures'

export interface ResponseJsonByEndpoint {
  '/user': User
  '/users': User[]
  '/task': Task
  '/tasks': Task[]
}
