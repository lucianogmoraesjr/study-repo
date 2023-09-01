import { useEffect, useState } from 'react'
import { CaretRight } from '@phosphor-icons/react'
import './App.scss'

function App() {
  const [step, setStep] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    setCurrentStep(step)
  }, [step])

  function prevStep() {
    if (step === 0) return

    setStep((prevState) => prevState - 1)
    setCurrentStep(step)
  }

  function nextStep() {
    if (step === 2) return

    setStep((prevState) => prevState + 1)
    setCurrentStep(step)
  }

  return (
    <main id="app">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="step-progress">
          <strong
            className={`${currentStep === 0 ? 'active' : ''} ${
              currentStep > 0 ? 'done' : ''
            }`}
          >
            Contato
          </strong>

          <CaretRight weight="bold" />

          <strong
            className={`${currentStep === 1 ? 'active' : ''} ${
              currentStep > 1 ? 'done' : ''
            }`}
          >
            Empresa
          </strong>

          <CaretRight weight="bold" />

          <strong className={`${currentStep === 2 ? 'active' : ''}`}>
            Projeto
          </strong>
        </div>

        <div className={`form-step ${step === 0 ? 'active' : ''}`}>
          <div className="content">
            <div className="input-wrapper">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Como prefere ser chamado"
                required
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="phone">Telefone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                placeholder="Digite seu número de WhatsApp"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) event.preventDefault()
                }}
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Digite seu e-mail"
                required
              />
            </div>
          </div>

          <div className="button-wrapper justify-end">
            <button onClick={nextStep} type="button" className="btn primary">
              Continuar
            </button>
          </div>
        </div>

        <div className={`form-step ${step === 1 ? 'active' : ''}`}>
          <div className="content">
            <div className="input-wrapper">
              <label htmlFor="business-name">Nome da empresa</label>
              <input
                type="text"
                name="business-name"
                id="business-name"
                placeholder="Qual é o nome da empresa"
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="business-colab-number">
                Número de funcionários
              </label>
              <input
                type="text"
                name="business-colab-number"
                id="business-colab-number"
                placeholder="Digite o número de colaboradores"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) event.preventDefault()
                }}
              />
            </div>

            <div className="input-wrapper">
              <label htmlFor="business-about">Sobre seu negócio</label>
              <textarea
                name="business-about"
                id="business-about"
                placeholder="Fale um pouco sobre seus produtos ou serviços"
              />
            </div>
          </div>

          <div className="button-wrapper">
            <button onClick={prevStep} type="button" className="btn secondary">
              Voltar
            </button>
            <button onClick={nextStep} type="button" className="btn primary">
              Continuar
            </button>
          </div>
        </div>

        <div className={`form-step ${step === 2 ? 'active' : ''}`}>
          <div className="content">
            <div className="input-wrapper">
              <label htmlFor="project">Objetivos do projeto</label>
              <textarea
                name="project"
                id="project"
                placeholder="Descreva quais os objetivos desse projeto"
              />
            </div>
          </div>

          <div className="button-wrapper">
            <button onClick={prevStep} type="button" className="btn secondary">
              Voltar
            </button>
            <button type="submit" className="btn primary">
              Enviar resposta
            </button>
          </div>
        </div>
      </form>
    </main>
  )
}

export default App
