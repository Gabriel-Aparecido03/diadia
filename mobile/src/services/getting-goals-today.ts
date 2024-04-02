import { api } from "../api"

export async function gettingGoalsToday(date: Date) {
  try {
    const res = await api.get({ url: `/goals/by-date?date=${date}` })
    return res
  } catch (error) {
    console.log(error)
  }
}