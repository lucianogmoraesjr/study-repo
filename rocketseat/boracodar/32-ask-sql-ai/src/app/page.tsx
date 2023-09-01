"use client"

import { useState } from 'react'
import { Stars, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-sql'
import 'prismjs/themes/prism-dark.css'
import { useCompletion } from 'ai/react'

export default function Home() {
  const [schema, setSchema] = useState('')

  const { completion, handleSubmit, input, handleInputChange, setInput, setCompletion } = useCompletion({
    api: '/api/completion',
    body: {
      schema
    }
  })

  function clear() {
    setSchema('')
    setInput('')
    setCompletion('')
  }


  return (
    <div className='max-w-[430px] mx-auto px-4 pt-12 pb-4'>
      <header className='flex items-center justify-between'>
        <Image src='/logo.svg' width={118} height={27} alt='Logo AskSQL' />

        <button onClick={clear} type='button'>
          <Trash2 className='h-8 w-8 text-snow' strokeWidth={0.8} />
        </button>
      </header>

      <form onSubmit={handleSubmit} className='py-8 w-full flex flex-col text-foam'>
        <label className='text-lg font-light' htmlFor="schema">Cole seu código SQL aqui:</label>

        <div className='my-6 h-40 overflow-auto bg-blueberry-600 border border-blueberry-300 rounded-md focus-within:ring-1 focus-within:ring-lime-600'>
          <Editor
            highlight={code => highlight(code, languages.sql, 'sql')}
            value={schema}
            onValueChange={code => setSchema(code)}
            padding={16}
            textareaClassName='outline-none'
            className='font-mono'
          />
        </div>

        <label className='text-lg font-light' htmlFor="question">Faça uma pergunta sobre o código:</label>
        <textarea
          className='my-4 h-24 bg-blueberry-600 border border-blueberry-300 rounded-md px-4 py-3 outline-none focus:ring-1 focus:ring-lime-600'
          name="question"
          id="question"
          value={input}
          onChange={handleInputChange}
        />

        <button type="submit" className='text-pistachio flex items-center justify-center rounded-lg border border-pistachio h-14 gap-2 mt-6 hover:bg-pistachio hover:text-blueberry-900 transition duration-200 ease-linear'>
          <Stars className='h-6 w-6' />
          Perguntar à inteligência artificial
        </button>
      </form>

      <div className='mt-6 text-foam'>
        <span className='text-lg font-light text-foam'>Resposta:</span>
        <div className='my-6 h-56 overflow-auto bg-transparent border border-blueberry-300 rounded-md focus-within:ring-1 focus-within:ring-lime-600'>
          <Editor
            readOnly
            highlight={code => highlight(code, languages.sql, 'sql')}
            value={completion}
            onValueChange={() => {}}
            padding={16}
            textareaClassName='outline-none'
            className='font-mono'
          />
        </div>
      </div>
    </div>
  )
}
