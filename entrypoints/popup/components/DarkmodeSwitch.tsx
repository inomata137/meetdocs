import { togglePreference } from '@/entrypoints/lib/dark-mode'

export function DarkmodeSwitch() {
  return (
    <button
      type="button"
      className="p-1 rounded-xs hover:bg-gray-900/5 dark:hover:bg-white/10 cursor-pointer"
      onClick={togglePreference}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        role="img"
        className="h-4.5 w-4.5"
      >
        <title>Toggle dark mode</title>
        <path
          d="M 128,56 A 72 72 180 0 1 128 200 A 72 72 180 0 1 128 56 M 128,72 A 56 56 180 0 0 128 184 Z"
          fill="currentColor"
        />
        <line
          x1="246"
          y1="128"
          x2="214"
          y2="128"
          strokeWidth="16"
          strokeLinecap="round"
          stroke="currentColor"
        />
        <line
          x1="211.4386"
          y1="211.4386"
          x2="188.81118"
          y2="188.81118"
          strokeWidth="16"
          strokeLinecap="round"
          stroke="currentColor"
        />
        <line
          x1="128"
          y1="246"
          x2="128"
          y2="214"
          strokeWidth="16"
          strokeLinecap="round"
          stroke="currentColor"
        />
        <line
          x1="44.5614"
          y1="211.4386"
          x2="67.18882"
          y2="188.81118"
          strokeWidth="16"
          strokeLinecap="round"
          stroke="currentColor"
        />
        <line
          x1="10"
          y1="128"
          x2="42"
          y2="128"
          strokeWidth="16"
          strokeLinecap="round"
          stroke="currentColor"
        />
        <line
          x1="44.5614"
          y1="44.5614"
          x2="67.18882"
          y2="67.18882"
          strokeWidth="16"
          strokeLinecap="round"
          stroke="currentColor"
        />
        <line
          x1="128"
          y1="10"
          x2="128"
          y2="42"
          strokeWidth="16"
          strokeLinecap="round"
          stroke="currentColor"
        />
        <line
          x1="211.4386"
          y1="44.5614"
          x2="188.81118"
          y2="67.18882"
          strokeWidth="16"
          strokeLinecap="round"
          stroke="currentColor"
        />
      </svg>
    </button>
  )
}
