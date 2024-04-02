import { api } from "../api";

type CreateHabitPayload = {
  day: Date;
  description: string;
  name: string;
  weekday: {
    timeInSeconds: number;
    weekday: number;
  }[];
}

export async function createHabit(payload: CreateHabitPayload) {
  const res = await api.post({ url: '/habit', body: { ...payload } })
  return res
}