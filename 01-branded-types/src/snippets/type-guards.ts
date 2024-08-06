type EmailAddress = string & { readonly brand: unique symbol }

function isEmailAddress(value: string): value is EmailAddress {
  return /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(value)
}

function sendEmail(email: EmailAddress) {
  console.log(`Sending email to ${email}`)
}

const email: string = 'user@example.com'
if (isEmailAddress(email)) {
  sendEmail(email)
}
else {
  console.log('Invalid email address')
}

export {}
