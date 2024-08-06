export function processResponse(response: 'yes' | 'no') {
  if (response === 'yes') {
    // Process "yes"
  }
  else if (response === 'no') {
    // Process "no"
  }
  else {
    // This else block is unreachable, response is of type 'never' here
    const unreachable: never = response
  }
}

type UserRole = 'admin' | 'user' | 'guest'
export function processRole(role: UserRole) {
  switch (role) {
    case 'admin': return 'Administrator'
    case 'user': return 'Regular User'
    case 'guest': return 'Guest User'
    default:
      // This case is unreachable if we've handled all UserRole cases
      const exhaustiveCheck: never = role
      return exhaustiveCheck
  }
}
