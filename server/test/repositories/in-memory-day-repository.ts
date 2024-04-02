import { DayRepository } from "@/domain/habits/application/repositories/day-repository";
import { Day } from "@/domain/habits/enterprise/entities/day";

export class DayRepositoryInMemory implements DayRepository {

  public items: Day[] = []

  async create(day: Day): Promise<void> {
    this.items.push(day)
  }

  async getByDate(date: Date): Promise<Day> {
    const res = this.items.find(i => i.date.getTime() == date.getTime())
    return res
  }

  async getById(id: string): Promise<Day> {
    const res = this.items.find(i => i.id.toString() === id)
    return res
  }

  async update(day: Day): Promise<void> {
    const index = this.items.findIndex(i => i.id.equals(day.id))
    this.items[index] = day
  }
}