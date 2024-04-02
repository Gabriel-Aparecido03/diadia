import { AuthGuard } from "@/infra/auth/auth.guard"
import { CurrentUser } from "@/infra/auth/current-user"
import { Controller,HttpCode, Param, UseGuards, Get } from "@nestjs/common"
import { z } from "zod"
import { GoalPresenter } from "../../presenters/goal-presenter"
import { GetByIdGoalUseCase } from "@/domain/habits/application/use-cases/get-by-id-goal"

const paramSchemaValidation = z.object({
  goalId : z.string()
})

type paramType = z.infer<typeof paramSchemaValidation>

@Controller('/goal/:goalId')
export class GetByIdGoalController {
  constructor(private getbyIdGoalUseCase: GetByIdGoalUseCase) { }

  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async handle(@Param() { goalId }: paramType, @CurrentUser() { sub }) {
    const goal = await this.getbyIdGoalUseCase.execute({ goalId ,userId : sub })
    return new GoalPresenter().toHttp(goal)
  }
}