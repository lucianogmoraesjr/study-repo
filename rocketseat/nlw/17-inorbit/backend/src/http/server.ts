import fastifyCors from '@fastify/cors'
import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { createGoal } from './routes/create-goal'
import { createGoalCompletion } from './routes/create-goal-completion'
import { getWeekPendingGoals } from './routes/get-week-pending-goals'
import { getWeekSummary } from './routes/get-week-summary'

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(createGoal)
app.register(getWeekPendingGoals)
app.register(createGoalCompletion)
app.register(getWeekSummary)

app
  .listen({ port: 3333, host: '0.0.0.0' })
  .then(() => console.log('🔥 server running on http://localhost:3333'))
