import { useState } from 'react'
import { Header } from './components/Header'
import { MeetingList } from './components/MeetingList'
import { Settings } from './components/Settings'

export function App() {
  const [tab, setTab] = useState<'main' | 'settings'>('main')

  return (
    <div className="w-48">
      <Header setTab={setTab} />
      {tab === 'main' && <MeetingList />}
      {tab === 'settings' && <Settings setTab={setTab} />}
    </div>
  )
}
