import type { calendar_v3 } from '@googleapis/calendar'
import { Temporal } from 'temporal-polyfill'

type ListEventsResponse = calendar_v3.Schema$Events

const TIME_ZONE = 'Asia/Tokyo'

async function getToken(interactive: boolean): Promise<string | undefined> {
  const { token } = await chrome.identity.getAuthToken({
    interactive,
    scopes: ['https://www.googleapis.com/auth/calendar.readonly']
  })
  return token
}

async function fetchEvents(token: string): Promise<ListEventsResponse> {
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
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return await res.json()
}

export default defineBackground(() => {
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.method === 'getAttachments') {
      const handler = async () => {
        const meetingId = message.meetingId
        const token = await getToken(false)
        if (!token) {
          sendResponse({
            status: 'error',
            message: 'Failed to get token'
          })
          return
        }
        const events = await fetchEvents(token ?? '')
        const matchedEvents =
          events.items?.filter(
            (event) => event.conferenceData?.conferenceId === meetingId
          ) ?? []
        sendResponse({
          status: 'ok',
          events: matchedEvents
        })
      }
      handler()
      return true
    }
  })
})
