/* eslint-disable prefer-promise-reject-errors */
import ytdl from 'ytdl-core'
import fs from 'fs'

export const downloader = (videoId: string) =>
  new Promise<void>((resolve, reject) => {
    const videoUrl = `https://youtube.com/watch?v=${videoId}`

    console.log('[STARTING_DOWNLOAD]', videoUrl)

    ytdl(videoUrl, {
      quality: 'lowestaudio',
      filter: 'audioonly',
    })
      .on('end', () => {
        console.log('[FINISHED_DOWNLOAD]')
        resolve()
      })
      .on('error', () => {
        console.log('[ERROR_DOWNLOAD]')
        reject('[ERROR_DOWNLOADING_VIDEO]')
      })
      .pipe(fs.createWriteStream('audio.mp4'))
  })
