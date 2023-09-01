import { ChangeEvent, useState } from 'react'
import { CircleHalf, Palette, Sun } from '@phosphor-icons/react'
import './App.scss'

function App() {
  const [hue, setHue] = useState(0)
  const [brightness, setBrightness] = useState(50)
  const [contrast, setContrast] = useState(100)

  function handleHueChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value
    setHue(Number(newValue))
  }

  function handleBrightnessChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value
    setBrightness(Number(newValue))
  }

  function handleContrastChange(event: ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value
    setContrast(Number(newValue))
  }

  return (
    <main>
      <div
        className="preview"
        style={{
          background: `hsl(${hue}, 100%, ${brightness}%)`,
          boxShadow: `0px 0px 53px 13px hsl(${hue}, 100%, 50%)`,
          filter: `contrast(${contrast}%)`,
        }}
      ></div>

      <span>Ajustes de Iluminação</span>

      <div className="controls">
        <div className="hue">
          <Palette weight="thin" />

          <div>
            <input
              type="range"
              id="hue-slider"
              min={0}
              max={360}
              step={1}
              defaultValue={0}
              onChange={handleHueChange}
            />
          </div>
        </div>

        <div className="brightness">
          <Sun weight="thin" />

          <div>
            <input
              type="range"
              id="brightness-slider"
              min={0}
              max={50}
              step={1}
              defaultValue={50}
              onChange={handleBrightnessChange}
            />
          </div>
        </div>

        <div className="contrast">
          <CircleHalf weight="thin" />

          <div>
            <input
              type="range"
              id="contrast-slider"
              min={0}
              max={100}
              step={1}
              defaultValue={100}
              onChange={handleContrastChange}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
