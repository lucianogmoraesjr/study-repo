import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const firstHabitId = '0730ffac-d039-4194-9571-01aa2aa0efbd'
const firstHabitCreationDate = new Date('2022-12-31T03:00:00.000')

const secondHabitId = '00880d75-a933-4fef-94ab-e05744435297'
const secondHabitCreationDate = new Date('2023-01-03T03:00:00.000')

const thirdHabitId = 'fa1a1bcf-3d87-4626-8c0d-d7fd1255ac00'
const thirdHabitCreationDate = new Date('2023-01-08T03:00:00.000')

async function run() {
  await prisma.habit.deleteMany()
  await prisma.day.deleteMany()

  /**
   * Create habits
   */
  await Promise.all([
    prisma.habit.create({
      data: {
        id: firstHabitId,
        title: 'Beber 2L água',
        createdAt: firstHabitCreationDate,
        habitWeekDays: {
          create: [{ week_day: 1 }, { week_day: 2 }, { week_day: 3 }],
        },
      },
    }),

    prisma.habit.create({
      data: {
        id: secondHabitId,
        title: 'Exercitar',
        createdAt: secondHabitCreationDate,
        habitWeekDays: {
          create: [{ week_day: 3 }, { week_day: 4 }, { week_day: 5 }],
        },
      },
    }),

    prisma.habit.create({
      data: {
        id: thirdHabitId,
        title: 'Dormir 8h',
        createdAt: thirdHabitCreationDate,
        habitWeekDays: {
          create: [
            { week_day: 1 },
            { week_day: 2 },
            { week_day: 3 },
            { week_day: 4 },
            { week_day: 5 },
          ],
        },
      },
    }),
  ])

  await Promise.all([
    /**
     * Habits (Complete/Available): 1/1
     */
    prisma.day.create({
      data: {
        /** Monday */
        date: new Date('2023-01-02T03:00:00.000z'),
        dayHabits: {
          create: {
            habit_id: firstHabitId,
          },
        },
      },
    }),

    /**
     * Habits (Complete/Available): 1/1
     */
    prisma.day.create({
      data: {
        /** Friday */
        date: new Date('2023-01-06T03:00:00.000z'),
        dayHabits: {
          create: {
            habit_id: firstHabitId,
          },
        },
      },
    }),

    /**
     * Habits (Complete/Available): 2/2
     */
    prisma.day.create({
      data: {
        /** Wednesday */
        date: new Date('2023-01-04T03:00:00.000z'),
        dayHabits: {
          create: [{ habit_id: firstHabitId }, { habit_id: secondHabitId }],
        },
      },
    }),
  ])
}

run()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
