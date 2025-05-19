import type { calendar_v3 } from '@googleapis/calendar'
import { Temporal } from 'temporal-polyfill'
import { METHODS } from './lib/runtime-message'

const TIME_ZONE = 'Asia/Tokyo'

async function getToken(interactive: boolean): Promise<string | undefined> {
  const { token } = await chrome.identity.getAuthToken({
    interactive,
    scopes: [
      'https://www.googleapis.com/auth/calendar.calendarlist.readonly',
      'https://www.googleapis.com/auth/calendar.events.readonly'
    ]
  })
  return token
}

async function fetchEvents(
  token: string,
  selectedCalendars: Set<string>
): Promise<calendar_v3.Schema$Event[]> {
  const today = Temporal.Now.zonedDateTimeISO(TIME_ZONE).with({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0
  })
  const tommorow = today.add({ days: 1 })
  const timeMin = today.toString({
    smallestUnit: 'second',
    timeZoneName: 'never'
  })
  const timeMax = tommorow.toString({
    smallestUnit: 'second',
    timeZoneName: 'never'
  })
  const params = new URLSearchParams({
    maxResults: '10',
    timeMin,
    timeMax,
    timeZone: TIME_ZONE
  })
  const results = await Promise.all(
    Array.from(selectedCalendars).map(async (calendarId) => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?${params}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        const events: calendar_v3.Schema$Events = await res.json()
        return events.items ?? []
      } catch {
        return [] as calendar_v3.Schema$Event[]
      }
    })
  )
  return results.flat()
}

async function fetchCalendarList(
  token: string
): Promise<calendar_v3.Schema$CalendarList> {
  const calendarList = await fetch(
    'https://www.googleapis.com/calendar/v3/users/me/calendarList',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return await calendarList.json()
}

async function handleGetAttachments(
  meetingId: string,
  selectedCalendars: Set<string>,
  sendResponse: (response: unknown) => void
) {
  const token = await getToken(false)
  if (!token) {
    sendResponse({
      status: 'error',
      message: 'Failed to get token'
    })
    return
  }
  const events = await fetchEvents(token ?? '', selectedCalendars)
  const matchedEvents =
    events.filter(
      (event) => event.conferenceData?.conferenceId === meetingId
    ) ?? []
  sendResponse({
    status: 'ok',
    events: matchedEvents
  })
}

async function handleGetCalendarList(
  sendResponse: (response: unknown) => void
) {
  const token = await getToken(true)
  if (!token) {
    sendResponse({
      status: 'error',
      message: 'Failed to get token'
    })
    return
  }
  const calendarList = await fetchCalendarList(token ?? '')
  sendResponse({
    status: 'ok',
    calendars: calendarList.items ?? []
  })
}

export default defineBackground(() => {
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.method === METHODS.GET_ATTACHMENTS) {
      const meetingId: string = message.meetingId
      const selectedCalendars: Set<string> = message.selectedCalendars
      handleGetAttachments(meetingId, selectedCalendars, sendResponse)
      return true
    }
    if (message.method === METHODS.GET_CALENDAR_LIST) {
      handleGetCalendarList(sendResponse)
      return true
    }
  })
})
