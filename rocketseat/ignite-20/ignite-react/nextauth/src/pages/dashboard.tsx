import { Can } from '@/components/Can'
import { AuthContext } from '@/contexts/AuthContext'
import { useContext } from 'react'

export default function Dashboard() {
  const { user, signOut } = useContext(AuthContext)

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>

      <button onClick={signOut}>Sign out</button>

      <Can permissions={['metrics.list']}>
        <div>Métricas</div>
      </Can>
    </>
  )
}
