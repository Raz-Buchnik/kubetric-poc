interface Attrs {
  phone_number: string,
  code: string
}

export const getAuthorizationToken = async ({
  phone_number,
  code
}: Attrs): Promise<{ token: string }> => {

  // find the key in redis with the user id and the actual code
  
  // if exists, crypto/jwt sign on that phone number + id + some additional

  // return the token
  return {
    token: 'token'
  }

}