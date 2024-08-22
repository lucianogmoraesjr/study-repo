import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { prismaClient } from '../src/lib/prisma-client'

async function seed() {
  const eventId = '9e9bd979-9d10-4915-b339-3786b1634f33'

  await prismaClient.event.deleteMany()

  await prismaClient.event.create({
    data: {
      id: eventId,
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'Um evento p/ devs apaixonados(as) por código!',
      maximumAttendees: 120,
    },
  })

  const attendeesToInsert: Prisma.AttendeeUncheckedCreateInput[] = []

  for (let i = 0; i <= 120; i++) {
    attendeesToInsert.push({
      id: 10000 + i,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      eventId,
      createdAt: faker.date.recent({
        days: 30,
        refDate: dayjs().subtract(8, 'days').toDate(),
      }),
      checkIn: faker.helpers.arrayElement<
        Prisma.CheckInUncheckedCreateNestedOneWithoutAttendeeInput | undefined
      >([
        undefined,
        {
          create: {
            createdAt: faker.date.recent({ days: 7 }),
          },
        },
      ]),
    })
  }

  await Promise.all(
    attendeesToInsert.map((data) => {
      return prismaClient.attendee.create({
        data,
      })
    }),
  )
}

seed().then(() => {
  console.log('Database seeded!')
  prismaClient.$disconnect()
})
