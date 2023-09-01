import { useCallback, useEffect, useState } from 'react'
import YouTubePlayer from 'youtube-player'
import { YouTubePlayer as YouTubePlayerTypes } from 'youtube-player/dist/types'
import PlayerStates from 'youtube-player/dist/constants/PlayerStates'

import './styles.scss'

type CustomEvent = {
  target: YouTubePlayerTypes
  data: PlayerStates
}

export function VideoAmbilight() {
  const [videoPlayer, setVideoPlayer] = useState<YouTubePlayerTypes>()
  const [ambilightPlayer, setAmbilightPlayer] = useState<YouTubePlayerTypes>()

  // const videoId = 'qC0vDKVPCrw'
  // const videoId = 'ASzOzrB-a9E'
  // const videoId = 'Y5wssYZHVWc'
  const videoId = 'uL6nu0-zhu0'

  // const videoReady = useCallback((event: CustomEvent) => {
  //   setTimeout(() => event.target.playVideo(), 5000)
  // }, [])

  const videoStateChange = useCallback(
    async (event: CustomEvent) => {
      switch (event.data) {
        case PlayerStates.PLAYING:
          ambilightPlayer?.seekTo(await event.target.getCurrentTime(), true)
          ambilightPlayer?.playVideo()
          break
        case PlayerStates.PAUSED:
          ambilightPlayer?.seekTo(await event.target.getCurrentTime(), true)
          ambilightPlayer?.pauseVideo()
          break
      }
    },
    [ambilightPlayer],
  )

  const optimizeAmbilight = useCallback(async (event: CustomEvent) => {
    const qualityLevels: string[] = [
      ...(await event?.target?.getAvailableQualityLevels()),
    ]

    event?.target?.mute()

    if (qualityLevels && qualityLevels.length && qualityLevels.length > 0) {
      qualityLevels.reverse()

      const lowestLevel =
        qualityLevels[qualityLevels.findIndex((q) => q !== 'auto')]

      event.target.setPlaybackQuality(lowestLevel)
    }
  }, [])

  const ambilightStateChange = useCallback(
    (event: CustomEvent) => {
      switch (event.data) {
        case PlayerStates.BUFFERING:
        case PlayerStates.PLAYING:
          optimizeAmbilight(event)
          break
      }
    },
    [optimizeAmbilight],
  )

  const ambilightReady = useCallback(
    (event: CustomEvent) => {
      optimizeAmbilight(event)
    },
    [optimizeAmbilight],
  )

  useEffect(() => {
    const video = YouTubePlayer('ambilight-video', {
      videoId,
    })

    const ambilight = YouTubePlayer('ambilight', {
      videoId,
    })

    setVideoPlayer(video)
    setAmbilightPlayer(ambilight)
  }, [])

  useEffect(() => {
    // videoPlayer?.on('ready', () => videoPlayer.seekTo(10, true))

    videoPlayer?.on('stateChange', videoStateChange as unknown as () => void)

    ambilightPlayer?.on('ready', ambilightReady as () => void)
    ambilightPlayer?.on('stateChange', ambilightStateChange as () => void)
  }, [
    videoPlayer,
    ambilightPlayer,
    ambilightReady,
    videoStateChange,
    ambilightStateChange,
  ])

  return (
    <div className="videoWrapper">
      <div className="ambilightWrapper">
        <div className="aspectRatio">
          <div className="ambilight" id="ambilight"></div>
          <div className="video" id="ambilight-video"></div>
        </div>
      </div>
    </div>
  )
}
