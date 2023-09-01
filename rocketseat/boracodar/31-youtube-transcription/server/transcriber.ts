/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-finally */
import { pipeline } from '@xenova/transformers'

// import data from './data.json'

let data: any = null

export async function transcribeAudio() {
  const options = {
    chunk_length_s: 30,
    stride_length_s: 5,
    language: 'portuguese',
    task: 'transcribe',
    return_timestamps: true,
  }

  try {
    console.time()
    console.log('[START_TRANSCRIBE]')

    const transcriber = await pipeline(
      'automatic-speech-recognition',
      'Xenova/whisper-small',
    )

    data = await transcriber('../audio.mp3', options)
  } catch (error) {
    console.log('[ERROR_TRANSCRIBE]')
    throw new Error(error as string)
  } finally {
    console.timeEnd()
    console.log('[FINISHED_TRANSCRIBE]')
    return data
  }
}
