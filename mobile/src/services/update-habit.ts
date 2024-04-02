import { api } from "../api";

type UpdateHabitPayload = {
  id: string
  description: string;
  name: string;
  weekday: {
    timeInSeconds: number;
    weekday: number;
  }[];
}

export async function updateHabit({ id, description, name, weekday }: UpdateHabitPayload) {
  const res = await api.put({ url: `/habit/${id}`, body: { description, name, weekday } })
  return res
}