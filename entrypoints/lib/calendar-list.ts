import type { calendar_v3 } from '@googleapis/calendar'

export type CalendarListResponse =
  | { status: 'ok'; calendars: calendar_v3.Schema$CalendarListEntry[] }
  | { status: 'error'; message: string }

export async function getCalendarList(): Promise<CalendarListResponse> {
  return await chrome.runtime.sendMessage({
    method: 'getCalendarList'
  })
}

const STORAGE_KEY = 'selectedCalendars'

export function getSelectedCalendars(): Set<string> | null {
  const selectedCalendars = localStorage.getItem(STORAGE_KEY)
  if (selectedCalendars === null) {
    return null
  }
  const selectedCalendarsArray: string[] = JSON.parse(selectedCalendars)
  return new Set(selectedCalendarsArray)
}

export function setSelectedCalendars(selectedCalendars: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...selectedCalendars]))
}
