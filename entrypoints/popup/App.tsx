import { Suspense } from 'react'
import { Header } from './components/Header'
import { MeetingList } from './components/MeetingList'

export function App() {
  return (
    <div className="w-48">
      <Header />
      <Suspense fallback={<div className="text-sm px-2 py-1">Loading...</div>}>
        <MeetingList />
      </Suspense>
    </div>
  )
}
