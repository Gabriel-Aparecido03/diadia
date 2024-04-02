import { ToogleHabitUseCase } from "@/domain/habits/application/use-cases/toggle-habit"
import { AuthGuard } from "@/infra/auth/auth.guard"
import { CurrentUser } from "@/infra/auth/current-user"
import { Controller, HttpCode, Param, UseGuards, Put } from "@nestjs/common"
import { z } from "zod"

const paramSchemaValidation = z.object({
  habitId : z.string()
})

type paramType = z.infer<typeof paramSchemaValidation>

@Controller('/habit/:habitId/toggle')
export class ToggleHabitController {
  constructor(private toogleHabitUseCase: ToogleHabitUseCase) { }

  @Put()
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async handle(@Param() { habitId }: paramType, @CurrentUser() { sub }) {
    await this.toogleHabitUseCase.execute({ habitId ,userId : sub })
  }
}