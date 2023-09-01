import { ChangeEvent, useState } from 'react'

import beforeImg from './assets/before.jpg'
import afterImg from './assets/after.jpg'
import sliderThumb from './assets/slider-thumb.svg'

import './App.scss'

function App() {
  const [slider, setSlider] = useState<string>()

  function handleSliderChange(event: ChangeEvent<HTMLInputElement>) {
    setSlider(event.target.value)
  }

  return (
    <main className="image-container">
      <picture className="after-image">
        <img src={afterImg} alt="" />
      </picture>

      <picture className="before-image" style={{ width: `${slider}%` }}>
        <img src={beforeImg} alt="" />
      </picture>

      <input
        type="range"
        id="slider"
        min={0}
        max={100}
        onChange={handleSliderChange}
      />

      <div id="slider-thumb" style={{ left: `calc(${slider}%)` }}>
        <img src={sliderThumb} alt="Slider" />
      </div>
    </main>
  )
}

export default App
