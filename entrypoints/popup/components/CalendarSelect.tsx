import {
  type CalendarListResponse,
  getCalendarList,
  getSelectedCalendars,
  setSelectedCalendars
} from '@/entrypoints/lib/calendar-list'
import type { calendar_v3 } from '@googleapis/calendar'
import { Suspense, use } from 'react'

function isCalendarWithNonNullId(
  calendar: calendar_v3.Schema$CalendarListEntry
): calendar is calendar_v3.Schema$CalendarListEntry & { id: string } {
  return typeof calendar.id === 'string'
}

type CalendarSelectProps = {
  calendars: Promise<CalendarListResponse>
  onChange: () => void
}

function CalendarSelectInner(props: CalendarSelectProps) {
  const calendars = use(props.calendars)

  if (calendars.status === 'error') {
    return <div className="px-2 py-1 text-xs">{calendars.message}</div>
  }

  const defaultSelectedCalendars = getSelectedCalendars()
  const isDefaultSelected = (calendarId: string, isPrimary: boolean) => {
    return defaultSelectedCalendars
      ? defaultSelectedCalendars.has(calendarId)
      : isPrimary
  }

  return (
    <ul>
      {calendars.calendars.filter(isCalendarWithNonNullId).map((calendar) => (
        <li key={calendar.id}>
          <label className="flex items-center gap-1 cursor-pointer hover:bg-gray-900/5 dark:hover:bg-white/10">
            <input
              type="checkbox"
              name={calendar.id ?? '(no title)'}
              defaultChecked={isDefaultSelected(
                calendar.id,
                calendar.primary ?? false
              )}
              onChange={props.onChange}
            />
            <span className="flex-1 line-clamp-1">{calendar.summary}</span>
          </label>
        </li>
      ))}
    </ul>
  )
}

export function CalendarSelect() {
  const calendars = getCalendarList()
  const formRef = useRef<HTMLFormElement>(null)
  const onChange = () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current)
      setSelectedCalendars(new Set(formData.keys()))
    }
  }
  return (
    <form ref={formRef} className="px-2 py-1">
      <div className="pb-0.5">Select calendars</div>
      <Suspense fallback={<div className="text-xs">Loading...</div>}>
        <CalendarSelectInner calendars={calendars} onChange={onChange} />
      </Suspense>
    </form>
  )
}
