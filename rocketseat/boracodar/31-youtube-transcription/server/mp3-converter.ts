import ffmpegStatic from 'ffmpeg-static'
import ffmpeg from 'fluent-ffmpeg'

export const convertMp3 = () =>
  new Promise<void>((resolve, reject) => {
    ffmpeg.setFfmpegPath(ffmpegStatic as string)

    ffmpeg()
      .input('audio.mp4')
      .outputOptions('-ab', '20k')
      .saveToFile('audio.mp3')
      .on('end', () => {
        console.log('Successfully converted audio')
        resolve()
      })
      .on('error', (error) => {
        console.log('[ERROR_CONVERTING]', error)
        reject(error)
      })
  })
