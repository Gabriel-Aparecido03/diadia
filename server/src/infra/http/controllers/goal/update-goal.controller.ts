import { UpdateGoalUseCase } from "@/domain/habits/application/use-cases/update-goal"
import { AuthGuard } from "@/infra/auth/auth.guard"
import { CurrentUser } from "@/infra/auth/current-user"
import { Controller, HttpCode, Body, UseGuards, Param, Put } from "@nestjs/common"
import { z } from "zod"

const bodySchemaValidation = z.object({
  description: z.string(),
  name: z.string(),
})

const paramSchemaValidation = z.object({
  goalId: z.string()
})

type bodyType = z.infer<typeof bodySchemaValidation>

type paramType = z.infer<typeof paramSchemaValidation>

@Controller('/goal/:goalId')
export class UpdateGoalController {
  constructor(private updateGoalUseCase: UpdateGoalUseCase) { }

  @Put()
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async handle(@Body() { description, name }: bodyType, @CurrentUser() { sub }, @Param() { goalId }: paramType) {
    await this.updateGoalUseCase.execute({ description, name, userId: sub, goalId })
  }
}