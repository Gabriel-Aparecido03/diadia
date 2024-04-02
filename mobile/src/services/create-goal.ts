import { api } from "../api";

type CreateGoalPayload = {
  day: Date;
  description: string;
  name: string;
}

export async function createGoal(payload: CreateGoalPayload) {
  const res = await api.post({ url: '/goal', body: { ...payload } })
  return res
}