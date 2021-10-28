interface Attrs {
  phone_number: string
}

export const createVerificationCode = async ({
  phone_number
}: Attrs): Promise<void> => {

  // request the user from db by phone number

  // generate some random verification code (4 digits)

  // save it in redis with user id and  5 minute TTL
  
  // send the code via SMS (service) to the phone number of the user

}