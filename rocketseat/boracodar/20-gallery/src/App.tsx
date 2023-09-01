import { ArrowDownRight } from '@phosphor-icons/react'
import './App.scss'

function App() {
  return (
    <div className="app">
      <header>
        <h1>The — Abstract Gallery</h1>
        <ArrowDownRight />
      </header>

      <main>
        <div className="model-1">
          <div className="container">
            <img
              loading="lazy"
              src="https://source.unsplash.com/random?a=1"
              alt="Abstract Name 1"
            />
            <span>Abstract Name 1</span>
          </div>

          <div className="container">
            <img
              loading="lazy"
              src="https://source.unsplash.com/random?b=1"
              alt="Abstract Name 2"
            />
            <span>Abstract Name 2</span>
          </div>

          <div className="container">
            <img
              loading="lazy"
              src="https://source.unsplash.com/random?c=1"
              alt="Abstract Name 3"
            />
            <span>Abstract Name 3</span>
          </div>

          <div className="container">
            <img
              loading="lazy"
              src="https://source.unsplash.com/random?d=1"
              alt="Abstract Name 4"
            />
            <span>Abstract Name 4</span>
          </div>
        </div>

        <div className="model-2">
          <div className="container">
            <img
              loading="lazy"
              src="https://source.unsplash.com/random?e=1"
              alt="Abstract Name 5"
            />
            <span>Abstract Name 5</span>
          </div>

          <div className="container">
            <img
              loading="lazy"
              src="https://source.unsplash.com/random?f=1"
              alt="Abstract Name 6"
            />
            <span>Abstract Name 6</span>
          </div>

          <div className="container">
            <img
              loading="lazy"
              src="https://source.unsplash.com/random?g=1"
              alt="Abstract Name 7"
            />
            <span>Abstract Name 7</span>
          </div>

          <div className="container">
            <img
              loading="lazy"
              src="https://source.unsplash.com/random?h=1"
              alt="Abstract Name 8"
            />
            <span>Abstract Name 8</span>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
