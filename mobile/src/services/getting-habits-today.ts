import { api } from "../api"

export async function gettingHabitsToday(date: Date) {
  try {
    const res = await api.get({ url: `/habits/by-date?date=${date}` })
    return res
  } catch (error) {
    console.log(error)
  }
}