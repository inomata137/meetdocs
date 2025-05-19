import type { Dispatch, SetStateAction } from 'react'
import { CalendarSelect } from './CalendarSelect'

type SettingsProps = {
  setTab: Dispatch<SetStateAction<'main' | 'settings'>>
}

export function Settings({ setTab }: SettingsProps) {
  return (
    <div className="relative">
      <button
        type="button"
        className="absolute top-1 right-1.5 p-0.5 cursor-pointer rounded-xs hover:outline outline-gray-300"
        onClick={() => setTab('main')}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          role="img"
          className="h-4 w-4"
        >
          <title>Back to main page</title>
          <path
            d="M42 76 l28-28 M42 76 l28 28 M42 76 H170 A52 52 0 0 1 170 180 H42"
            strokeWidth="24"
            stroke="currentColor"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </button>
      <CalendarSelect />
    </div>
  )
}
