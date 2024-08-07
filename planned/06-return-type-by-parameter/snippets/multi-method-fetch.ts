import type { ResponseJsonByEndpoint } from './response-mapping'

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

type ResponseType<E extends keyof ResponseJsonByEndpoint, M extends Method> =
  M extends 'GET' ? ResponseJsonByEndpoint[E] :
    M extends 'POST' ? { id: number } :
      M extends 'PUT' ? boolean :
        M extends 'DELETE' ? void :
          never

async function customFetch<E extends keyof ResponseJsonByEndpoint, M extends Method>(
  endpoint: E | `${E}?${string}`,
  method: M,
): Promise<ResponseType<E, M>> {
  const response = await fetch(`/api${endpoint}`, { method })
  return await response.json()
}

// Usage examples:
const users = await customFetch('/users', 'GET') // Type: User[]
const newUserId = await customFetch('/users', 'POST') // Type: { id: number }
const updated = await customFetch('/users?id=1', 'PUT') // Type: boolean
await customFetch('/users?id=1', 'DELETE') // Type: void
