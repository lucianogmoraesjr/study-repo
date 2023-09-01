import tabletImg from './assets/tablet-portrait.svg'
import peopleImg from './assets/people.svg'
import documentImg from './assets/document-text.svg'
import cogImg from './assets/cog.svg'
import pencilImg from './assets/pencil.svg'
import filterImg from './assets/filter.svg'
import searchImg from './assets/search.svg'

import logoImg from './assets/logo.svg'

import './App.scss'

interface Tasks {
  todo: Array<{
    title: string
    content: string
    tags: Array<string>
  }>
  doing: Array<{
    title: string
    content: string
    tags: Array<string>
  }>
  done: Array<{
    title: string
    content: string
    tags: Array<string>
  }>
}
const tasks: Tasks = {
  todo: [
    {
      title: '#boraCodar um Kanban 🧑‍💻',
      content: `Novo desafio do #boraCodar da Rocketseat, onde é proposto
    construir um quadro de Kanban.`,
      tags: ['rocketseat', 'desafio'],
    },
  ],
  doing: [
    {
      title: 'Conferir o novo desafio 🚀 ',
      content:
        'Conferir o novo projeto do #boraCodar para fazê-lo da melhor maneira possível',
      tags: ['rocketseat', 'desafio'],
    },
  ],
  done: [
    {
      title: '#boraCodar uma página de login 🧑‍💻',
      content:
        'Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.',
      tags: ['rocketseat', 'desafio'],
    },
  ],
}

function App() {
  return (
    <div id="container">
      <nav className="nav-bar">
        <header>
          <img src={logoImg} alt="Logo" />
        </header>

        <ul>
          <li>
            <a href="#" className="active">
              <img src={tabletImg} alt="Table" />
              Boards
            </a>
          </li>

          <li>
            <a href="#">
              <img src={peopleImg} alt="Table" />
              Equipes
            </a>
          </li>

          <li>
            <a href="#">
              <img src={documentImg} alt="Table" />
              Relatórios
            </a>
          </li>

          <li>
            <a href="#">
              <img src={cogImg} alt="Table" />
              Ajustes
            </a>
          </li>
        </ul>
      </nav>

      <main>
        <div className="wrapper">
          <section className="title-avatar">
            <h1>
              Meu Kanban <img src={pencilImg} alt="Pencil" />
            </h1>

            <img src="https://github.com/lucianogmoraesjr.png" alt="Avatar" />
          </section>

          <section className="filter">
            <button>
              <img src={filterImg} alt="Filtrar" />
              <span>Filtrar</span>
            </button>

            <div className="input-wrapper">
              <img src={searchImg} alt="Procurar" />

              <input
                type="text"
                placeholder="Busque por cards, assuntos ou responsáveis..."
              />
            </div>
          </section>

          <section className="kanban">
            <div className="todo">
              <h2>A fazer</h2>
              <div className="cards">
                {tasks.todo.map((todo) => (
                  <div key={todo.title} className="card">
                    <h3>{todo.title}</h3>
                    <p>{todo.content}</p>
                    <div className="tags">
                      {todo.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="doing">
              <h2>Fazendo</h2>
              <div className="cards">
                {tasks.doing.map((doing) => (
                  <div key={doing.title} className="card">
                    <h3>{doing.title}</h3>
                    <p>{doing.content}</p>
                    <div className="tags">
                      {doing.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="done">
              <h2>Feito</h2>
              <div className="cards">
                {tasks.done.map((done) => (
                  <div key={done.title} className="card">
                    <h3>{done.title}</h3>
                    <p>{done.content}</p>
                    <div className="tags">
                      {done.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
export default App
