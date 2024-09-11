import { db } from '../db'
import { goals } from '../db/schema'

interface CreateGoalRequest {
  title: string
  desiredWeeklyFrequency: number
}

export async function createGoalUseCase({
  desiredWeeklyFrequency,
  title,
}: CreateGoalRequest) {
  const [goal] = await db
    .insert(goals)
    .values({
      title,
      desiredWeeklyFrequency,
    })
    .returning()

  return { goal }
}