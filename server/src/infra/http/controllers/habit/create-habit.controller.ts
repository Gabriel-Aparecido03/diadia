import { CreateHabitUseCase } from "@/domain/habits/application/use-cases/create-habit"
import { AuthGuard } from "@/infra/auth/auth.guard"
import { CurrentUser } from "@/infra/auth/current-user"
import { Controller, Post, HttpCode, Body, UseGuards } from "@nestjs/common"
import { z } from "zod"

const bodySchemaValidation = z.object({
  day: z.coerce.date(),
  description: z.string(),
  name: z.string(),
  weekday: z.array(z.object({
    timeInSeconds: z.coerce.number(),
    weekday: z.coerce.number().min(0).max(6)
  }))
})

type bodyType = z.infer<typeof bodySchemaValidation>

@Controller('/habit')
export class CreateHabitController {
  constructor(private createHabitUseCase: CreateHabitUseCase) { }

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard)
  async handle(@Body() { day, description, name, weekday }: bodyType, @CurrentUser() { sub }) {
    console.log(weekday)
    await this.createHabitUseCase.execute({ day, description, name, userId: sub, weekday })
  }
}