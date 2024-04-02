import { HabitRepository } from "@/domain/habits/application/repositories/habit-repository";
import { datesAreOnSameDay } from "@/domain/habits/application/use-cases/utils/is-the-same-day";
import { Habit } from "@/domain/habits/enterprise/entities/habit";

export class HabitRepositoryInMemory implements HabitRepository {

  public items: Habit[] = []

  async create(habit: Habit): Promise<void> {
    this.items.push(habit)
  }

  async update(habit: Habit): Promise<void> {
    const index = this.items.findIndex(i => i.id.equals(habit.id))
    this.items[index] = habit
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter(i => i.id.toString() !== id)
  }

  async getById(id: string): Promise<Habit> {
    const res = this.items.find(i => i.id.toString() === id)
    return res
  }

  async fetchByDate({ date, userId }: { date: Date, userId: string }): Promise<Habit[]> {
    const res = this.items.filter(i => datesAreOnSameDay(i.createdAt, date) && userId === i.userId.toString())
    return res
  }

  async fetchStatsByMonth({ start, end, userId }: { start: Date; end: Date; userId: string; }): Promise<Habit[]> {
    const res = this.items.filter(i => i.createdAt >= start && i.createdAt <= end && i.userId.toString() === userId)
    return res
  }

}