import { InTestEncrypter } from "test/cryptoghphay/in-test-encrypter"
import { InTestHashComparer } from "test/cryptoghphay/in-test-hash-comparer"
import { InvalidCredentials } from "./errors/invalid-credentials"
import { UserRepositoryInMemory } from "test/repositories/in-memory-user-repository"
import { makeUser } from "test/factories/make-user"
import { HabitRepositoryInMemory } from "test/repositories/in-memory-habit-repository"
import { DayRepositoryInMemory } from "test/repositories/in-memory-day-repository"
import { makeHabit } from "test/factories/make-habit"
import { makeDay } from "test/factories/make-day"
import { FetchByDateHabitUseCase } from "./fetch-by-date-habit"

describe('Fetch by date habit - Unit', () => {
  let sut: FetchByDateHabitUseCase
  let inMemoryUserRepository: UserRepositoryInMemory
  let inMemoryHabitRepository: HabitRepositoryInMemory
  let inMemoryDayRepository: DayRepositoryInMemory

  beforeEach(() => {
    inMemoryUserRepository = new UserRepositoryInMemory()
    inMemoryHabitRepository = new HabitRepositoryInMemory()
    inMemoryDayRepository = new DayRepositoryInMemory()
    sut = new FetchByDateHabitUseCase(inMemoryHabitRepository, inMemoryUserRepository)
  })

  it('should be fetch date habit by date', async () => {
    const user = makeUser({ password: 'password-hashed' })
    inMemoryUserRepository.create(user)

    const habit = makeHabit({ userId: user.id })
    inMemoryHabitRepository.create(habit)

    const res = await sut.execute({
      userId: user.id.toString(),
      date: new Date()
    })

    expect(res).toHaveLength(1)
  })

  it('not should be fetch date habit by date with invalid credentials', async () => {
    const user = makeUser({ password: 'password-hashed' })
    inMemoryUserRepository.create(user)

    const habit = makeHabit({ userId: user.id })
    inMemoryHabitRepository.create(habit)

    expect(async () => {
      await sut.execute({
        userId: 'wrong-id',
        date: new Date()
      })
    }).rejects.toBeInstanceOf(InvalidCredentials)
  })
})