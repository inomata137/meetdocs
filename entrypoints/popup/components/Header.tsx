import type { Dispatch, SetStateAction } from 'react'
import { CalendarSelectButton } from './CalendarSelectButton'
import { DarkmodeSwitch } from './DarkmodeSwitch'

type HeaderProps = {
  setTab: Dispatch<SetStateAction<'main' | 'settings'>>
}

export function Header({ setTab }: HeaderProps) {
  return (
    <header className="border-b border-gray-900/10 dark:border-white/10 pl-2 pr-1 py-0.5 flex items-center gap-1">
      <h1 className="text-base font-medium flex-1">MeetDocs</h1>
      <CalendarSelectButton setTab={setTab} />
      <DarkmodeSwitch />
    </header>
  )
}
