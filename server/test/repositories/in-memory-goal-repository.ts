import { GoalRepository } from "@/domain/habits/application/repositories/goal-repository"
import { Goal } from "@/domain/habits/enterprise/entities/goal"

export class GoalRepositoryInMemory implements GoalRepository {

  public items: Goal[] = []

  async create(goal: Goal): Promise<void> {
    this.items.push(goal)
  }

  async update(goal: Goal): Promise<void> {
    const index = this.items.findIndex(i => i.id.equals(goal.id))
    this.items[index] = goal
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter(i => i.id.toString() !== id)
  }

  async getById(id: string): Promise<Goal> {
    const res = this.items.find(i => i.id.toString() === id)
    return res
  }

  async fetchByDate(date: Date): Promise<Goal[]> {
    const formatDate = new Date(date.toDateString())
    const res = this.items.filter(i => new Date(i.createdAt.toDateString()) === formatDate)
    return res
  }

  async fetchByMonth(date: Date): Promise<Goal[]> {
    const formatDate = new Date(date.toDateString())
    const lastDay = new Date(formatDate.getFullYear(), formatDate.getMonth() + 1, 0);
    const firstDay = new Date(formatDate.getFullYear(), formatDate.getMonth(), 1);

    const res = this.items.filter(i => new Date(i.createdAt.toDateString()) > firstDay && new Date(i.createdAt.toDateString()) < lastDay)
    return res
  }
}