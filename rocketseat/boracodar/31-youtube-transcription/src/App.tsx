/* eslint-disable no-return-assign */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useRef, useState } from 'react'
import { CheckCircle, CopySimple } from '@phosphor-icons/react'
import YouTube, { YouTubePlayer } from 'react-youtube'
import axios from 'axios'
import { transcribeAudio } from '../server/transcriber'

import logoImg from './assets/logo.svg'

import './App.scss'

let videoElement: YouTubePlayer = null;

interface Chunk {
  text: string
  timestamp: Array<number>
}

interface ChunksData {
  text: string
  chunks: Chunk[]
}

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')
  const [videoId, setVideoId] = useState('')
  const [chunks, setChunks] = useState<ChunksData>({} as ChunksData)
  const [isCopying, setIsCopying] = useState(false)

  const appRef = useRef<HTMLDivElement>(null)

  const transcriptionRef = useRef<HTMLDivElement>(null)

  function copy() {
    setIsCopying(true)

    const texts = transcriptionRef.current?.getElementsByTagName('p')

    const textsArray = Array.prototype.slice.call(texts)

    const output = [...textsArray].reduce((acc, text) => acc += text.innerText + " ", "").trim()

    navigator.clipboard.writeText(output)

    setTimeout(() => setIsCopying(false), 2000)
  }

  function getVideoId(url: string) {
    if (!url) {
      return ''
    }

    const [, queryParams] = url.split('?v=')
    const [videoId] = queryParams.split('&')
    return videoId
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    try {
      setIsLoading(true)

      appRef.current?.setAttribute(
        'data-message',
        'Carregando vídeo do YouTube',
      )

      const id = getVideoId(videoUrl)

      setVideoId(id)

      appRef.current?.setAttribute(
        'data-message',
        'Transcrevendo vídeo. Isto pode levar um tempo',
      )

      await axios.get(`http://localhost:3333/audio?v=${id}`)

      const data: ChunksData = await transcribeAudio()

      setChunks(data)
    } catch (error) {
      console.log('[SUBMIT_ERROR]', error)
    } finally {
      setIsLoading(false)
    }
  }

  function getMinutes(timestamp: Array<number>) {
    const date = new Date(0)

    date.setTime(timestamp[0] * 1000)

    return date.toISOString().slice(14, 19)
  }

  function groupedText(text: string, timestamp: Array<number>) {
    const words = text.split(' ')

    const groups = []

    for (let index = 0; index < words.length; index++) {
      if (index % 3 === 0) {
        groups.push(words.slice(index, index + 3).join(' '))
      }
    }

    return groups.map((item, index) => {
      const [initialTime, finalTime] = timestamp

      const seekTo = index === 0 ? initialTime : (((finalTime - initialTime) / (groups.length - index)) + initialTime)

      return <span onClick={() => seek(seekTo)} key={index}>{item} </span>
    })
  }

  function seek(timestamp: number) {
    videoElement.target.seekTo(timestamp)
  };

  function _onReady (event: YouTubePlayer) {
    videoElement = event;
  };

  return (
    <div
      ref={appRef}
      id="app"
      className={`flex ${isLoading && 'loading'}`}
      data-message="..."
    >
      <header className="grid">
        <div className="logo">
          <img src={logoImg} alt="Logo" />
        </div>
        <form id="form" className="flex" onSubmit={handleSubmit}>
          <div className="input-wrapper flex">
            <label className="sr-only" htmlFor="url">
              Cole a URL do YouTube aqui
            </label>
            <input
              required
              type="url"
              name="url"
              id="url"
              placeholder="Cole a URL do YouTube aqui"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
            <i className="ph ph-x-circle"></i>
          </div>
          <button>Transcrever</button>
        </form>
      </header>

      <main>
        <div className="wrapper grid">
          <div className="video">
            <YouTube videoId={videoId} onReady={_onReady} />
          </div>
          <div className="transcription" >
            <button onClick={copy} className="copy">
              {isCopying ? <CheckCircle /> : <CopySimple />}
            </button>
            <div className="content-wrapper">
              <div ref={transcriptionRef} className="content grid">
                {!chunks.chunks && (
                  <div className="chunk flex">
                    <time className="flex">00:00</time>
                    <p>
                      <span>
                        Insira a URL 
                      </span>
                      <span>
                        do youtube para
                      </span>
                      <span>
                        iniciar a transcrição
                      </span>
                    </p>
                  </div>
                )}
                
                {chunks.chunks?.map((chunk, index) => (
                  <div key={index} className="chunk flex">
                    <time className="flex">{getMinutes(chunk.timestamp)}</time>
                    <p>{groupedText(chunk.text, chunk.timestamp)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
