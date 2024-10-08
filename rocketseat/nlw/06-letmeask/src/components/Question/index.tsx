import { ReactNode } from 'react'

import './syles.scss'

interface QuestionProps {
  content: string
  author: {
    name: string
    avatar: string
  }
  isAnswered?: boolean
  isHighlighted?: boolean
  children?: ReactNode
}

export function Question({
  author,
  content,
  isAnswered = false,
  isHighlighted = false,
  children,
}: QuestionProps) {
  return (
    <div
      className={`question ${isAnswered ? 'answered' : ''} ${
        isHighlighted && !isAnswered ? 'highlighted' : ''
      }`}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>

        <div>{children}</div>
      </footer>
    </div>
  )
}
