import { UniqueEntityID } from "@/domain/core/unique-entity-id"
import { Day } from "@/domain/habits/enterprise/entities/day"
import { GoalProps, Goal } from "@/domain/habits/enterprise/entities/goal"
import { faker } from "@faker-js/faker"

export function makeGoal(
  override: Partial<GoalProps> = {},
  id?: UniqueEntityID,
) {
  const goal = Goal.create(
    {
      name: faker.lorem.text(),
      description: faker.lorem.text(),
      userId: new UniqueEntityID(),
      deadline: Day.create({ date: new Date() }),
      ...override,
    },
    id,
  )

  return goal
}