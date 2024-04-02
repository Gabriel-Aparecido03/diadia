import { api } from "../api";

type UpdateGoalPayload = {
  id: string
  description: string;
  name: string;
}

export async function updateGoal({ id, description, name }: UpdateGoalPayload) {
  const res = await api.put({ url: `/goal/${id}`, body: { description, name } })
  return res
}