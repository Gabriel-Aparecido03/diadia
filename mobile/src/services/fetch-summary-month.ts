import { api } from "../api"

export async function fetchSummaryMonth(date: Date) {
  try {
    const res = await api.get({ url: `/habits/stats/month?date=${date}` })
    return res
  } catch (error) {
    console.log(error)
  }
}