import { FetchStatsByMonthHabitsUseCase } from "@/domain/habits/application/use-cases/fetch-habits-stats-by-month"
import { AuthGuard } from "@/infra/auth/auth.guard"
import { CurrentUser } from "@/infra/auth/current-user"
import { Controller, HttpCode, Body, UseGuards, Get } from "@nestjs/common"
import { z } from "zod"

const bodySchemaValidation = z.object({
  date: z.coerce.date()
})

type bodyType = z.infer<typeof bodySchemaValidation>

@Controller('/habits/stats/month')
export class FetchStatsByMonthHabitsController {
  constructor(private fetchStatsByMonthHabitsUseCase: FetchStatsByMonthHabitsUseCase) { }
  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async handle(@Body() { date }: bodyType, @CurrentUser() { sub }) {

    const habit = await this.fetchStatsByMonthHabitsUseCase.execute({ date : new Date(date), userId: sub })
    return habit
  }
}