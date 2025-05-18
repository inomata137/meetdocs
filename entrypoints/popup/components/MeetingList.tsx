import type { calendar_v3 } from '@googleapis/calendar'
import { use } from 'react'
import { Meeting } from './Meeting'

async function getMeetingId(): Promise<string | null> {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
  const url = tabs[0].url
  if (!url || !url.startsWith('https://meet.google.com/')) {
    return null
  }
  const meetingId = new URL(url).pathname.substring(1) // strip leading slash
  return meetingId
}

type AttachmentsResponse =
  | { status: 'ok'; events: calendar_v3.Schema$Event[] }
  | { status: 'error'; message: string }

async function getAttachments(): Promise<AttachmentsResponse> {
  const meetingId = await getMeetingId()
  if (meetingId === null) {
    return {
      status: 'error',
      message: 'Failed to get meeting ID'
    }
  }
  return await chrome.runtime.sendMessage<
    { method: string; meetingId: string },
    AttachmentsResponse
  >({
    method: 'getAttachments',
    meetingId
  })
}

const attachmentsPromise = getAttachments()

export const MeetingList = () => {
  const attachmentsResponse = use(attachmentsPromise)

  if (attachmentsResponse.status === 'error') {
    return <div>{attachmentsResponse.message}</div>
  }

  const events = attachmentsResponse.events
  return (
    <>
      {events.map((event) => (
        <Meeting
          key={event.id}
          title={event.summary ?? '(no title)'}
          attachments={event.attachments ?? []}
        />
      ))}
    </>
  )
}
