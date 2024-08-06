type EmailAddress = string & { readonly brand: unique symbol }

function assertsEmailAddress(value: string): asserts value is EmailAddress {
  if (!/^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(value))
    throw new Error('Not a valid email')
}

function sendEmail(email: EmailAddress) {
  console.log(`Sending email to ${email}`)
}

const email: string = 'user@example.com'
assertsEmailAddress(email)
sendEmail(email)

export {}
