import { api } from "../api"

export async function gettingAccountInfos() {
  const res = await api.get({ url: '/session/me' })
  return res
}