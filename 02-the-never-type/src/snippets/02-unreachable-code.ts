function processResponse(response: 'yes' | 'no') {
  if (response === 'yes') {
    console.log('yes')
  }
  else if (response === 'no') {
    console.log('no')
  }
  else {
    const unreachable: never = response
    console.log('We should never get here!', unreachable)
  }
}
