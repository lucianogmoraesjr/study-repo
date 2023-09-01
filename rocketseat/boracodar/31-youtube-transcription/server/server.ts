import express from 'express'
import cors from 'cors'

import { downloader } from './video-downloader'
import { convertMp3 } from './mp3-converter'
// import { transcribeAudio } from './transcriber'

const app = express()

app.use(cors())

app.get('/audio', async (req, res) => {
  const videoId = req.query.v
  try {
    await downloader(videoId as string)
    await convertMp3()
    res.send('ok')
  } catch (error) {
    console.log(error)
    return res.send(error)
  }
})

app.listen(3333, () =>
  console.log('🔥 server running on http://localhost:3333'),
)
