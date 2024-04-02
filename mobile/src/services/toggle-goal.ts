import { api } from "../api";

type ToggleGoalPayload = {
  id: string
}

export async function toggleGoal({ id }: ToggleGoalPayload) {
  const res = await api.put({ url: `/goal/${id}/toggle` })
  return res
}