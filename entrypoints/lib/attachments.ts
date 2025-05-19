import type { calendar_v3 } from '@googleapis/calendar'
import { getCalendarList, getSelectedCalendars } from './calendar-list'
import { METHODS } from './runtime-message'

export type AttachmentsResponse =
  | { status: 'ok'; events: calendar_v3.Schema$Event[] }
  | { status: 'error'; message: string }

async function getMeetingId(): Promise<string | null> {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
  const url = tabs[0].url
  if (!url || !url.startsWith('https://meet.google.com/')) {
    return null
  }
  const meetingId = new URL(url).pathname.substring(1) // strip leading slash
  return meetingId
}

export async function getAttachments(): Promise<AttachmentsResponse> {
  const meetingId = await getMeetingId()
  if (meetingId === null) {
    return {
      status: 'error',
      message: "You're not in a Google Meet :("
    }
  }
  const calendarList = await getCalendarList()
  if (calendarList.status === 'error') {
    return {
      status: 'error',
      message: calendarList.message
    }
  }
  const selectedCalendars = getSelectedCalendars()
  return await chrome.runtime.sendMessage<
    { method: string; meetingId: string; selectedCalendars: string[] },
    AttachmentsResponse
  >({
    method: METHODS.GET_ATTACHMENTS,
    meetingId,
    selectedCalendars: selectedCalendars
      ? Array.from(selectedCalendars)
      : ['primary']
  })
}
