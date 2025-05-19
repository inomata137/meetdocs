import {
  type AttachmentsResponse,
  getAttachments
} from '@/entrypoints/lib/attachments'
import { Suspense, use } from 'react'
import { Meeting } from './Meeting'

type MeetingListInnerProps = {
  attachments: Promise<AttachmentsResponse>
}

function MeetingListInner(props: MeetingListInnerProps) {
  const attachmentsResponse = use(props.attachments)

  if (attachmentsResponse.status === 'error') {
    return (
      <div className="px-2 py-1 text-xs">{attachmentsResponse.message}</div>
    )
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

export function MeetingList() {
  const attachments = getAttachments()
  return (
    <Suspense fallback={<div className="text-sm px-2 py-1">Loading...</div>}>
      <MeetingListInner attachments={attachments} />
    </Suspense>
  )
}
