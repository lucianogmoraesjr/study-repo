import 'dotenv/config'
import fastify from 'fastify'
import { fastifyCors } from '@fastify/cors'

import { getAllPromptsRoute } from './routes/get-all-prompts.routes'
import { uploadVideoRoute } from './routes/upload-video.routes'
import { createTranscription } from './routes/create-transcription.routes'
import { generateAICompletionRoute } from './routes/generate-ai-completion.routes'

const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)
app.register(createTranscription)
app.register(generateAICompletionRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => console.log('🔥 server running on http://localhost:3333'))
