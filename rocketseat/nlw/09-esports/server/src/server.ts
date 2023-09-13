import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

import { convertHourStringToMinutes } from './utils/convertHourStringToMinutes'
import { convertMinutesToHourString } from './utils/convertMinutesToHourString'

const app = express()
app.use(cors())

app.use(express.json())

const prisma = new PrismaClient()

app.get('/games', async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })

  return res.json(games)
})

app.post('/games/:id/ads', async (req, res) => {
  const {id} = req.params
  const { 
    name,
    weekDays,
    useVoiceChannel,
    yearsPlaying,
    discord,
    hourStart,
    hourEnd } = req.body

  const ad = await prisma.ad.create({
    data: {
      gameId: id,
      name, 
      discord, 
      hourEnd: convertHourStringToMinutes(hourEnd), 
      hourStart: convertHourStringToMinutes(hourStart), 
      useVoiceChannel, 
      weekDays: weekDays.join(','), 
      yearsPlaying
    }
  })

  return res.json(ad)
})

app.get('/games/:id/ads', async (req, res) => {
  const { id } = req.params

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true
    },
    where: {
      gameId: id
    },
    orderBy: {
      cratedAt: 'desc'
    }
  })

  const formattedAds = ads.map(ad => {
    return {
      ...ad, 
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd)
    }
  })

  return res.json(formattedAds)
})

app.get('/ads/:id/discord', async (req, res) => {
  const { id } = req.params

  const ad = await prisma.ad.findUnique({
    select: {
      discord: true
    },
    where: {
      id
    }
  })
 
  return res.json(ad)
})

app.listen(3333, () => console.log('🔥 server running on http://localhost:3333'))