export interface UserAddressesResponse {
  results: number
  status: string
  data: userAddresses[]
}

export interface userAddresses {
  _id: string
  name: string
  details: string
  phone: string
  city: string
}
