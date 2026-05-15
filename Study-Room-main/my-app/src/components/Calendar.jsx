import { useState, useEffect, useRef } from 'react'
import './Calendar.css'

const MONTH_NAMES = [
  'Janar', 'Shkurt', 'Mars', 'Prill', 'Maj', 'Qershor',
  'Korrik', 'Gusht', 'Shtator', 'Tetor', 'Nëntor', 'Dhjetor',
]

const WEEKDAY_LABELS = [
  'Hën', 'Mar', 'Mër', 'Enj', 'Pre', 'Sht', 'Die',
]

function Calendar({ selectedDate, onDateSelect, formattedDate }) {
  const [isOpen, setIsOpen] = useState(false)
  const [calendarDate, setCalendarDate] = useState(new Date())
  const wrapperRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function prevMonth() {
    setCalendarDate(prev => {
      const d = new Date(prev)
      d.setMonth(d.getMonth() - 1)
      return d
    })
  }

  function nextMonth() {
    setCalendarDate(prev => {
      const d = new Date(prev)
      d.setMonth(d.getMonth() + 1)
      return d
    })
  }

  const year = calendarDate.getFullYear()
  const month = calendarDate.getMonth()
  const startWeekDay = (new Date(year, month, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  function handleDayClick(day) {
    onDateSelect(new Date(year, month, day))
    setIsOpen(false)
  }

  return (
    <div className="date-picker-wrapper" ref={wrapperRef}>
      <label className="date-label">Data:</label>
      <button
        type="button"
        className="date-button"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span>{formattedDate}</span>
        <span className="material-icons">expand_more</span>
      </button>

      {isOpen && (
        <div className="calendar-popup">
          <div className="calendar-header">
            <button type="button" onClick={prevMonth}>&lt;</button>
            <span>{MONTH_NAMES[month]} {year}</span>
            <button type="button" onClick={nextMonth}>&gt;</button>
          </div>

          <div className="calendar-weekdays">
            {WEEKDAY_LABELS.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className="calendar-days">
            {Array.from({ length: startWeekDay }, (_, i) => (
              <div key={`empty-${i}`} className="calendar-day disabled" />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1
              const isSelected =
                selectedDate &&
                selectedDate.getFullYear() === year &&
                selectedDate.getMonth() === month &&
                selectedDate.getDate() === day
              return (
                <div
                  key={day}
                  className={`calendar-day${isSelected ? ' selected' : ''}`}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Calendar
