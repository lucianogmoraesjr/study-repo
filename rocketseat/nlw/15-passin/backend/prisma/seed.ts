import { prismaClient } from '../src/lib/prisma-client'

async function seed() {
  await prismaClient.event.create({
    data: {
      id: '76f0b501-546c-46c9-b2da-dbff46f96fec',
      title: 'Unite Summit',
      slug: 'unit-summit',
      details: 'Um evento para devs apaixonados(as) por código!',
      maximumAttendees: 120,
    },
  })
}

seed().then(() => {
  console.log('Database seeded.')
  prismaClient.$disconnect()
})
