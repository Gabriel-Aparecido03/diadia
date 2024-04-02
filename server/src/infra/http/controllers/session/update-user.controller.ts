import { UpdateUserUseCase } from "@/domain/habits/application/use-cases/update-user"
import { AuthGuard } from "@/infra/auth/auth.guard"
import { CurrentUser } from "@/infra/auth/current-user"
import { Controller, Post, HttpCode, Body, UseGuards, Put } from "@nestjs/common"
import { z } from "zod"

const bodySchemaValidation = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string()
})

type bodyType = z.infer<typeof bodySchemaValidation>

@Controller('/user')
export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) { }

  @Put()
  @HttpCode(204)
  @UseGuards(AuthGuard)
  async handle(@Body() requestBody: bodyType,@CurrentUser() { sub }) {
    const { email, password, name } = bodySchemaValidation.parse(requestBody)
    await this.updateUserUseCase.execute({ email, password ,name, id : sub})
  }
}