import { InTestEncrypter } from "test/cryptoghphay/in-test-encrypter"
import { InTestHashComparer } from "test/cryptoghphay/in-test-hash-comparer"
import { InvalidCredentials } from "./errors/invalid-credentials"
import { UserRepositoryInMemory } from "test/repositories/in-memory-user-repository"
import { makeUser } from "test/factories/make-user"
import { ResourceNotFound } from "./errors/resource-not-found"
import { HabitRepositoryInMemory } from "test/repositories/in-memory-habit-repository"
import { DayRepositoryInMemory } from "test/repositories/in-memory-day-repository"
import { makeHabit } from "test/factories/make-habit"
import { NotAllowed } from "./errors/not-allowed"
import { ToogleHabitUseCase } from "./toggle-habit"
import { makeDay } from "test/factories/make-day"

describe('Delete Habit - Unit', () => {
  let sut: ToogleHabitUseCase
  let inMemoryUserRepository: UserRepositoryInMemory
  let inMemoryHabitRepository: HabitRepositoryInMemory
  let inMemoryDayRepository: DayRepositoryInMemory

  beforeEach(() => {
    inMemoryUserRepository = new UserRepositoryInMemory()
    inMemoryHabitRepository = new HabitRepositoryInMemory()
    inMemoryDayRepository = new DayRepositoryInMemory()
    sut = new ToogleHabitUseCase(inMemoryHabitRepository, inMemoryUserRepository, inMemoryDayRepository)
  })

  it('should be make habit as done', async () => {
    const user = makeUser({ password: 'password-hashed' })
    inMemoryUserRepository.create(user)

    const habit = makeHabit({ userId: user.id })
    inMemoryHabitRepository.create(habit)

    await sut.execute({
      habitId: habit.id.toString(),
      userId: user.id.toString()
    })

    expect(inMemoryDayRepository.items[0].habits).toHaveLength(1)
  })

  it('should be make habit as not done', async () => {
    const user = makeUser({ password: 'password-hashed' })
    inMemoryUserRepository.create(user)

    const habit = makeHabit({ userId: user.id })
    inMemoryHabitRepository.create(habit)

    const day = makeDay({ date: new Date(new Date().toDateString()), habits: [habit] })
    inMemoryDayRepository.create(day)

    await sut.execute({
      habitId: habit.id.toString(),
      userId: user.id.toString()
    })

    expect(inMemoryDayRepository.items[0].habits).toHaveLength(0)
  })
})