import { AttendeesList } from './components/attendees-list'
import { Header } from './components/header'

export function App() {
  return (
    <div className="max-w-[1216px] mx-auto py-7 flex flex-col gap-7">
      <Header />
      <AttendeesList />
    </div>
  )
}
