import { api } from "../api"

interface authtenticateParamsType {
  email: string
  password: string
}

export async function authenticateUserAccount({ email, password }: authtenticateParamsType) {
  const res = await api.post({ url: '/session/authenticate', body: { email, password } })
  return res
}