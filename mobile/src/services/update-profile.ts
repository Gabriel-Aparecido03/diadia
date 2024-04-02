import { api } from "../api";

interface updateProfilePayloadType {
  email: string
  password: string
  name: string
}

export async function updateProfile(payload: updateProfilePayloadType) {
  const res = await api.put({ url: '/user', body: { ...payload } })
  return res
}