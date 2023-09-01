import { useState } from 'react'
import {
  ArrowCounterClockwise,
  CloudArrowUp,
  File,
  X,
} from '@phosphor-icons/react'

import './App.scss'

function App() {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <div id="container">
      <section className={`drag-files ${isDragging && `drag-over`}`}>
        <CloudArrowUp size={48} color="#7c3aed" />

        <h3>Importe seus arquivos</h3>
        <p>Arraste ou clique para fazer upload</p>

        <input
          type="file"
          onDragOver={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
        />
      </section>

      <section className="files">
        <div className="box uploading">
          <div className="icon">
            <File weight="fill" />
          </div>

          <div className="info">
            <div className="filename">Scann_158.pdf</div>
            <div className="filesize">
              <span>30 MB / </span>
              <span>70 MB</span>
            </div>
            <div className="bar">
              <progress value={46} max={100}></progress>
              <span>46%</span>
            </div>
          </div>

          <div className="action">
            <X />
          </div>
        </div>
        <div className="box done">
          <div className="icon">
            <File weight="fill" />
          </div>

          <div className="info">
            <div className="filename">README.md</div>
            <div className="filesize">
              <span>12 KB</span>
            </div>
            <div className="bar">
              <progress value={100} max={100}></progress>
              <span>100%</span>
            </div>
          </div>
        </div>

        <div className="box error">
          <div className="icon">
            <File weight="fill" />
          </div>

          <div className="info">
            <div className="filename">picture1.jpeg</div>
            <div className="filesize">
              <span>6.3 MB</span>
            </div>
            <div className="bar">
              <progress value={0} max={100}></progress>
              <span>Erro</span>
            </div>
          </div>

          <div className="action">
            <ArrowCounterClockwise />
          </div>
        </div>
      </section>
    </div>
  )
}

export default App
