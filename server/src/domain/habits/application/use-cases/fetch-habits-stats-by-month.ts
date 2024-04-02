import { Injectable } from "@nestjs/common";
import { HabitRepository } from "../repositories/habit-repository";
import { UserRepository } from "../repositories/user-repository";
import { InvalidCredentials } from "./errors/invalid-credentials";

interface FetchStatsByMonthHabitsUseCasePropsType {
  userId: string
  date: Date
}

@Injectable()
export class FetchStatsByMonthHabitsUseCase {

  constructor(
    private habitRepository: HabitRepository,
    private userRepository: UserRepository
  ) { }

  async execute({ userId, date }: FetchStatsByMonthHabitsUseCasePropsType) {

    var start = new Date(date.getFullYear(), date.getMonth(), 1);
    var end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const userExists = await this.userRepository.getById(userId)
    if (!userExists) throw new InvalidCredentials()

    const habits = await this.habitRepository.fetchStatsByMonth({ end, start, userId })
    return habits
  }
}