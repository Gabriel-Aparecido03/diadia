import { api } from "../api";

type DeleteGoalPayload = {
  id : string
}

export async function deleteGoal({ id }: DeleteGoalPayload) {
  const res = await api.delete({ url: `/goal/${id}`})
  return res
}