import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'

import { memoriesRoutes } from './routes/memories.routes'
import { authRoutes } from './routes/auth.routes'
import { uploadRoutes } from './routes/upload.routes'
import { resolve } from 'path'

const app = fastify()

app.register(cors)
app.register(multipart)
app.register(jwt, {
  secret: 'spacetime',
})

app.register(authRoutes)
app.register(uploadRoutes)
app.register(memoriesRoutes)
app.register(fastifyStatic, {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app
  .listen({ port: 3333, host: '0.0.0.0' })
  .then(() => console.log('🔥 server running on http://localhost:3333'))
