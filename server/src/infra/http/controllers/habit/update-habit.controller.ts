import { UpdateHabitUseCase } from "@/domain/habits/application/use-cases/update-habit"
import { AuthGuard } from "@/infra/auth/auth.guard"
import { CurrentUser } from "@/infra/auth/current-user"
import { Controller, Post, HttpCode, Body, UseGuards, Param, Put } from "@nestjs/common"
import { z } from "zod"

const bodySchemaValidation = z.object({
  description: z.string(),
  name: z.string(),
  weekday: z.array(z.object({
    timeInSeconds: z.coerce.number(),
    weekday: z.coerce.number().min(0).max(6)
  }))
})

const paramSchemaValidation = z.object({
  habitId : z.string()
})

type bodyType = z.infer<typeof bodySchemaValidation>

type paramType = z.infer<typeof paramSchemaValidation>

@Controller('/habit/:habitId')
export class UpdateHabitController {
  constructor(private updateHabitUseCase: UpdateHabitUseCase) { }

  @Put()
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async handle(@Body() { description, name, weekday }: bodyType, @CurrentUser() { sub },@Param() { habitId }: paramType) {
    await this.updateHabitUseCase.execute({ description, name, userId: sub, habitId , weekday })
  }
}