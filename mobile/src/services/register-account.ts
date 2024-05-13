import { api } from "../api"

interface authtenticateParamsType {
  email: string
  password: string
  name: string
}

export async function registerUserAccount({ email, password, name }: authtenticateParamsType) {
  try {
    const res = await api.post({ url: '/user', body: { email, password, name } })
    return res
  } catch (error) {
    throw error
  }
}