import { api } from "../api";

type DeleteHabitPayload = {
  id : string
}

export async function deleteHabit({ id }: DeleteHabitPayload) {
  const res = await api.delete({ url: `/habit/${id}`})
  return res
}