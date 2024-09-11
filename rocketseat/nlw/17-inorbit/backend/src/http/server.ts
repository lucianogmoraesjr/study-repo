import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { createGoal } from '../routes/create-goal'
import { createGoalCompletion } from '../routes/create-goal-completion'
import { getWeekPendingGoals } from '../routes/get-week-pending-goals'

const app = fastify()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(createGoal)
app.register(getWeekPendingGoals)
app.register(createGoalCompletion)

app
  .listen({ port: 3333, host: '0.0.0.0' })
  .then(() => console.log('🔥 server running on http://localhost:3333'))
