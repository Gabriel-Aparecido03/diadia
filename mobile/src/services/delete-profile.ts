import { api } from "../api";

export async function deleteProfile() {
  const res = await api.delete({ url: `/user`})
  return res
}