/* eslint-disable no-eval */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from './components/Button'

import equalsImg from './assets/equals.svg'
import divideImg from './assets/divide.svg'
import multiplyImg from './assets/multiply.svg'
import minusImg from './assets/minus.svg'
import plusImg from './assets/plus.svg'
import plusMinusImg from './assets/plus-minus.svg'
import equalsWhiteImg from './assets/equals-white.svg'

import './App.scss'
import { useState } from 'react'

function App() {
  const [display, setDisplay] = useState('0')
  const [lastCalc, setLastCalc] = useState('')

  const [calc, setCalc] = useState('')
  const [result, setResult] = useState('')

  const ops = ['/', '*', '+', '-', '.']

  function calculate() {
    setLastCalc(display)
    setDisplay(result)
  }

  function clearAll() {
    setDisplay('0')
    setCalc('')
    setResult('')
  }

  function clear() {
    setCalc((prevState) => prevState.slice(0, -1))
    setDisplay(calc)
  }

  const updateCalc = (event: React.MouseEvent<HTMLButtonElement>) => {
    const value = (event.currentTarget as HTMLButtonElement).value

    if (
      (ops.includes(value) && calc === '') ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return
    }

    setCalc(calc + value)
    setDisplay(calc + value)
    setLastCalc(calc + value)

    console.log(calc)

    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString())
    }
  }

  return (
    <div id="container">
      <div id="calculator">
        <div className="display">
          <div className="calc">{lastCalc}</div>
          <div className="result">
            <span>
              <img src={equalsImg} alt="Sinal de igual" />
            </span>
            <span>{display}</span>
          </div>
        </div>

        <div className="keyboard">
          <Button onClick={clearAll} variant="secondary">
            CE
          </Button>
          <Button onClick={clear}>C</Button>
          <Button>%</Button>
          <Button onClick={updateCalc} value="/" variant="tertiary">
            <img src={divideImg} alt="Simbolo de divisão" />
          </Button>
          <Button onClick={updateCalc} value="7">
            7
          </Button>
          <Button onClick={updateCalc} value="8">
            8
          </Button>
          <Button onClick={updateCalc} value="9">
            9
          </Button>
          <Button onClick={updateCalc} value="*" variant="tertiary">
            <img src={multiplyImg} alt="Simbolo de multiplicação" />
          </Button>
          <Button onClick={updateCalc} value="4">
            4
          </Button>
          <Button onClick={updateCalc} value="5">
            5
          </Button>
          <Button onClick={updateCalc} value="6">
            6
          </Button>
          <Button onClick={updateCalc} value="-" variant="tertiary">
            <img src={minusImg} alt="Simbolo de subtração" />
          </Button>
          <Button onClick={updateCalc} value="1">
            1
          </Button>
          <Button onClick={updateCalc} value="2">
            2
          </Button>
          <Button onClick={updateCalc} value="3">
            3
          </Button>
          <Button onClick={updateCalc} value="+" variant="tertiary">
            <img src={plusImg} alt="Simbolo de soma" />
          </Button>
          <Button>
            <img src={plusMinusImg} alt="Simbolo de mais ou menos" />
          </Button>
          <Button>0</Button>
          <Button>,</Button>
          <Button onClick={calculate} variant="quartiary">
            <img src={equalsWhiteImg} alt="Simbolo de igualdade" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App
