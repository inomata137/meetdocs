const DARK = 'dark'
const LIGHT = 'light'

function getPreference(): boolean {
  const cache = localStorage.getItem('theme')
  if (cache) {
    return cache === DARK
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function applyPreference() {
  const isDark = getPreference()
  document.documentElement.classList.toggle(DARK, isDark)
}

export function togglePreference() {
  const newPreference = !getPreference()
  localStorage.setItem('theme', newPreference ? DARK : LIGHT)
  applyPreference()
}
