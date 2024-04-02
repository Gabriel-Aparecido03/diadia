import { api } from "../api";

type GetByIdGoalPayload = {
  id : string
}

export async function getbyIdGoal({ id }: GetByIdGoalPayload) {
  const res = await api.get({ url: `/goal/${id}`})
  return res
}