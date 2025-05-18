const getPreference = (): boolean => {
  const cache = localStorage.getItem('theme')
  if (cache) {
    return cache === 'dark'
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export const applyPreference = () => {
  const isDark = getPreference()
  document.documentElement.classList.toggle('dark', isDark)
}

export const togglePreference = () => {
  const newPreference = !getPreference()
  localStorage.setItem('theme', newPreference ? 'dark' : 'light')
  applyPreference()
}
