import type { calendar_v3 } from '@googleapis/calendar'

type AttachmentWithUrl = calendar_v3.Schema$EventAttachment & {
  fileUrl: string
}

function isAttachment(
  attachment: calendar_v3.Schema$EventAttachment
): attachment is AttachmentWithUrl {
  return typeof attachment.fileUrl === 'string'
}

type MeetingProps = {
  title: string
  attachments: calendar_v3.Schema$EventAttachment[]
}

export function Meeting(props: MeetingProps) {
  const title = props.title
  const attachments = props.attachments.filter(isAttachment)
  if (attachments.length === 0) {
    return null
  }
  return (
    <section className="px-2 py-1">
      <div className="text-xs px-0.5 line-clamp-1">{title}</div>
      <ul className="text-sm">
        {attachments.map((at) => (
          <li key={at.fileUrl} className="py-1">
            <a
              href={at.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex px-2 py-1 gap-1.5 items-center rounded-md border border-gray-900/10 dark:border-white/35 hover:bg-blue-500/10"
            >
              {at.iconLink && (
                <img src={at.iconLink} alt="icon" className="h-4" />
              )}
              <div className="line-clamp-1">{at.title}</div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
