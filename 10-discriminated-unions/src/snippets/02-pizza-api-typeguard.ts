type Pizza = {
  id: number
  name: string
  toppings: string[]
}

type ErrorResponse = {
  error: string
  code: number
}

function isPizza(response: Pizza | ErrorResponse): response is Pizza {
  return Object.keys(response).includes('name')
}
// @ts-expect-error Example
function getPizzaApiResponse(): Pizza | ErrorResponse { /* Same as before */ }

const response = getPizzaApiResponse()

if (isPizza(response)) {
  console.log('Pizza name:', response.name)
}
else {
  console.log('API error:', response.error)
}
