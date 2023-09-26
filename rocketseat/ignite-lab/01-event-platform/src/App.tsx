import { ApolloProvider } from '@apollo/client'

import { client } from './lib/apollo.ts'

import { Router } from './Router.tsx'

export function App() {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  )
}
