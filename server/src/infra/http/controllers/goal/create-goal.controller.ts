import { CreateGoalUseCase } from "@/domain/habits/application/use-cases/create-goal"
import { AuthGuard } from "@/infra/auth/auth.guard"
import { CurrentUser } from "@/infra/auth/current-user"
import { Controller, Post, HttpCode, Body, UseGuards } from "@nestjs/common"
import { z } from "zod"

const bodySchemaValidation = z.object({
  day: z.coerce.date(),
  description: z.string(),
  name: z.string(),
})

type bodyType = z.infer<typeof bodySchemaValidation>

@Controller('/goal')
export class CreateGoalController {
  constructor(private createGoalUseCase: CreateGoalUseCase) { }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async handle(@Body() { day, description, name }: bodyType, @CurrentUser() { sub }) {
    await this.createGoalUseCase.execute({ description, name, userId: sub, day })
  }
}