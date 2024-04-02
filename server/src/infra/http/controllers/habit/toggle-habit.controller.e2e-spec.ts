import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@/infra/app.module';
import { makeUser, UserFactory } from 'test/factories/make-user';
import { hash } from 'bcryptjs';
import { DatabaseModule } from '@/infra/database/database.module';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { Weekday } from '@/domain/habits/enterprise/entities/weekday';
import { WeekdayList } from '@/domain/habits/enterprise/entities/weekday-list';
import { HabitFactory, makeHabit } from 'test/factories/make-habit';

describe('Toggle Habit - E2E', () => {
  let app: INestApplication;
  let userFactory: UserFactory
  let jwt: JwtService
  let prisma: PrismaService
  let habitFactory: HabitFactory
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, HabitFactory]
    }).compile()
    app = moduleRef.createNestApplication();
    jwt = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)
    userFactory = moduleRef.get(UserFactory)
    habitFactory = moduleRef.get(HabitFactory)
    await app.init();
  });

  test(`[PUT] /habit/:habitId/toogle`, async () => {
    const user = makeUser({
      email: 'johndoe@email.com',
      password: await hash('password', 8)
    })

    const habit = makeHabit({
      userId: user.id,
      createdAt: new Date(),
    })

    const weekday = Weekday.create({ datetime: new Date(), habitId: habit.id, weekday: 0 })

    const weekdayList1 = new WeekdayList([weekday])
    habit.weekdays = weekdayList1

    await userFactory.execute(user)
    await habitFactory.execute(habit)

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .put(`/habit/${habit.id}/toggle`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toEqual(204)
    const habitsOnDatabse = await prisma.habitDay.findMany({
      where: {
        habit_id: habit.id.toString()
      }
    })
    expect(habitsOnDatabse).toHaveLength(1)

    const responseToggle = await request(app.getHttpServer())
      .put(`/habit/${habit.id}/toggle`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(responseToggle.statusCode).toEqual(204)
    const habitsDeleteOnDatabse = await prisma.habitDay.findMany({
      where: {
        habit_id: habit.id.toString()
      }
    })
    expect(habitsDeleteOnDatabse).toHaveLength(0)
  })
})