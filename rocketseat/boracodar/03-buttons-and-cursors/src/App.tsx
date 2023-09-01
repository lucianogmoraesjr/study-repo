import './App.scss'

import { Button } from './components/Button'

import notAllowed from './assets/not-allowed.png'
import loading from './assets/loading.png'

function App() {

  return (
    <div id='container'>
      <section className="button-types">
        <h1>Tipos de botão</h1>
        <p>
          Dentro de um layout, botões servem para destacar ações importantes a serem tomadas.
          Acompanhe abaixo um exemplo de tipos e propriedades.
        </p>

        <div className="buttons-table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>BOTÃO PRIMÁRIO</th>
                <th>BOTÃO SECUNDÁRIO</th>
                <th>BOTÃO TERCIÁRIO</th>
                <th>CURSOR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>DEFAULT</td>
                <td>
                  <Button text='DEFAULT PRIMARY' />
                </td>
                <td>
                  <Button text='DEFAULT SECONDARY' variant='secondary' />
                </td>
                <td>
                  <Button text='DEFAULT TERTIARY' variant='tertiary' />
                </td>
                <td>
                  <svg width="34" height="48" viewBox="0 0 34 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2045 24.015V8L22.7955 19.619H16.0145L15.6035 19.743L11.2045 24.015Z" fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.289 24.6893L16.684 26.2243L12.002 15.1353L15.688 13.5823L20.289 24.6893Z" fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9555 24.0086L17.1115 24.7826L14.0115 17.4086L15.8525 16.6336L18.9555 24.0086Z" fill="black" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2045 10.4071V21.5951L15.1735 18.7291L15.6015 18.5901H20.3695L12.2045 10.4071Z" fill="black" />
                  </svg>
                </td>
              </tr>
              <tr>
                <td>HOVER</td>
                <td>
                  <Button type='hover' text='HOVER PRIMARY' />
                </td>
                <td>
                  <Button type='hover' text='HOVER SECONDARY' variant='secondary' />
                </td>
                <td>
                  <Button type='hover' text='HOVER tertiary' variant='tertiary' />
                </td>
                <td>
                  <svg width="34" height="48" viewBox="0 0 34 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2045 24.015V8L22.7955 19.619H16.0145L15.6035 19.743L11.2045 24.015Z" fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.289 24.6893L16.684 26.2243L12.002 15.1353L15.688 13.5823L20.289 24.6893Z" fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9555 24.0086L17.1115 24.7826L14.0115 17.4086L15.8525 16.6336L18.9555 24.0086Z" fill="black" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2045 10.4071V21.5951L15.1735 18.7291L15.6015 18.5901H20.3695L12.2045 10.4071Z" fill="black" />
                  </svg>
                </td>
              </tr>
              <tr>
                <td>FOCUS</td>
                <td>
                  <Button type='focus' text='FOCUS PRIMARY' />
                </td>
                <td>
                  <Button type='focus' text='FOCUS SECONDARY' variant='secondary' />
                </td>
                <td>
                  <Button type='focus' text='FOCUS tertiary' variant='tertiary' />
                </td>
                <td>
                  <svg width="34" height="48" viewBox="0 0 34 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2045 24.015V8L22.7955 19.619H16.0145L15.6035 19.743L11.2045 24.015Z" fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M20.289 24.6893L16.684 26.2243L12.002 15.1353L15.688 13.5823L20.289 24.6893Z" fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.9555 24.0086L17.1115 24.7826L14.0115 17.4086L15.8525 16.6336L18.9555 24.0086Z" fill="black" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2045 10.4071V21.5951L15.1735 18.7291L15.6015 18.5901H20.3695L12.2045 10.4071Z" fill="black" />
                  </svg>
                </td>
              </tr>
              <tr>
                <td>DISABLED</td>
                <td>
                  <Button type='disabled' text='DISABLED PRIMARY' />
                </td>
                <td>
                  <Button type='disabled' text='DISABLED SECONDARY' variant='secondary' />
                </td>
                <td>
                  <Button type='disabled' text='DISABLED tertiary' variant='tertiary' />
                </td>
                <td>
                  <img src={notAllowed} alt="Not allowed pointer" />
                </td>
              </tr>
              <tr>
                <td>LOADING</td>
                <td>
                  <Button type='loading' text='LOADING PRIMARY' />
                </td>
                <td>
                  <Button type='loading' text='LOADING SECONDARY' variant='secondary' />
                </td>
                <td>
                  <Button type='loading' text='LOADING tertiary' variant='tertiary' />
                </td>
                <td>
                  <img src={loading} alt="Loading pointer" />
                </td>
              </tr>
              <tr>
                <td>MOVABLE</td>
                <td>
                  <Button type='movable' text='MOVABLE PRIMARY' />
                </td>
                <td>
                  <Button type='movable' text='MOVABLE SECONDARY' variant='secondary' />
                </td>
                <td>
                  <Button type='movable' text='MOVABLE tertiary' variant='tertiary' />
                </td>
                <td>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0005 4.987H11.0005V5.987H10.0005V4.987ZM11.0005 10.987H10.0005V9.987H11.0005V10.987ZM6.0005 5.987H5.0005V4.987H6.0005V5.987ZM6.0005 10.987H5.0005V9.987H6.0005V10.987ZM8.0005 0L0.0155029 7.988L5.2375 13.209L8.0005 15.972L15.9845 7.987L8.0005 0Z" fill="white" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.567 7.98417L12.01 5.17517V7.00417H8.00096H3.99996V5.17517L1.42896 7.98417L4.00095 10.7922L3.99996 8.98417H8.00096H12.01L12.009 10.7922L14.567 7.98417Z" fill="black" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.98791 7.98702H9.00091V3.98602L10.8079 3.98702L8.00091 1.41602L5.19191 3.98602H7.00091V7.98702H7.00891V11.989L5.18091 11.988L7.98791 14.565L10.7929 11.989H8.98791V7.98702Z" fill="black" />
                  </svg>

                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="button-test">
        <h1>Teste os botões</h1>
        <p>
          Interaja com os botões e observe a mudança
          de aparência e de cursores
        </p>

        <Button text='INTERAJA COMIGO' />
        <Button text='INTERAJA COMIGO' variant='secondary' />
        <Button text='INTERAJA COMIGO' variant='tertiary' type='movable' />
      </section>
    </div>
  )
}

export default App
