type Pizza = {
  id: number
  name: string
  toppings: string[]
}

type ErrorResponse = {
  error: string
  code: number
}

function getPizzaApiResponse(): Pizza | ErrorResponse {
  return Math.random() > 0.5
    ? { id: 1, name: 'Margherita', toppings: ['cheese', 'tomato'] }
    : { error: 'Not found', code: 404 }
}

const response = getPizzaApiResponse()

console.log('Pizza name:', response.name)
