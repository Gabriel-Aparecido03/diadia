import { api } from "../api";

type ToggleHabitPayload = {
  id: string
}

export async function toggleHabit({ id }: ToggleHabitPayload) {
  const res = await api.put({ url: `/habit/${id}/toggle` })
  return res
}