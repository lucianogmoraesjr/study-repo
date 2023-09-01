import { VideoAmbilight } from './components/VideoAmbilight'
import {
  IoAccessibilityOutline,
  IoAddOutline,
  IoAlbumsOutline,
  IoChevronBack,
  IoChevronForward,
  IoCopyOutline,
  IoPlayCircleOutline,
  IoSearchOutline,
  IoShareOutline,
} from 'react-icons/io5'
import { PanelLeft } from 'akar-icons'

import './App.scss'

function App() {
  return (
    <div id="app">
      <header className="nav-bar">
        <div className="actions">
          <div className="icon-wrapper">
            <PanelLeft />
          </div>
          <div className="icon-wrapper">
            <IoChevronBack />
          </div>
          <div className="icon-wrapper">
            <IoChevronForward />
          </div>
        </div>

        <div className="address-bar"></div>

        <div className="actions">
          <div className="icon-wrapper">
            <IoShareOutline />
          </div>
          <div className="icon-wrapper">
            <IoAddOutline />
          </div>
          <div className="icon-wrapper">
            <IoCopyOutline />
          </div>
        </div>
      </header>
      <aside className="side-menu">
        <div className="icon-wrapper">
          <IoPlayCircleOutline />
        </div>
        <div className="icon-wrapper">
          <IoAccessibilityOutline />
        </div>
        <div className="icon-wrapper">
          <IoAlbumsOutline />
        </div>
        <div className="icon-wrapper">
          <IoSearchOutline />
        </div>
      </aside>
      <main className="screen">
        <VideoAmbilight />
      </main>
      <footer className="interaction">
        <div className="elipse"></div>
        <div className="rectangle"></div>
      </footer>
    </div>
  )
}

export default App
