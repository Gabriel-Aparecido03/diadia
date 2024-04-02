import { api } from "../api";

type GetByIdHabitPayload = {
  id : string
}

export async function getbyIdHabit({ id }: GetByIdHabitPayload) {
  const res = await api.get({ url: `/habit/${id}`})
  return res
}