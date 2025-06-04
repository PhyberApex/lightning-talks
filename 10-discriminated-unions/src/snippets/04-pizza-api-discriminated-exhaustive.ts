type PizzaDiscriminated = {
  result: 'success'
  id: number
  name: string
  toppings: string[]
}

type ErrorResponseDiscriminated = {
  result: 'error'
  error: string
  code: number
}

type ProgressResponseDiscriminated = {
  result: 'progress'
  progress: number
}

type PizzaApiResponse = PizzaDiscriminated | ErrorResponseDiscriminated
// @ts-expect-error Example
function getPizzaApiResponseDiscriminated(): PizzaApiResponse { /* Same as before */ }

const response = getPizzaApiResponseDiscriminated()

switch (response.result) {
  case 'success':
    console.log('Pizza name:', response.name)
    break
  case 'error':
    console.log('API error:', response.error)
    break
  default:
  { const _: never = response }
}