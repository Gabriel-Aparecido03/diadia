import { api } from "../api"

export async function fetchSummaryWeek(date: Date) {
  try {
    const res = await api.get({ url: `/habits/stats/week?date=${date}` })
    return res
  } catch (error) {
    console.log(error)
  }
}