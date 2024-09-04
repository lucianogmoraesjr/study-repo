import { setDefaultOptions } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { RouterProvider } from 'react-router-dom'

import { router } from './router'

setDefaultOptions({ locale: ptBR })

export function App() {
  return <RouterProvider router={router} />
}
