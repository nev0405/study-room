import { useRef, useState } from 'react'
import Calendar from './Calendar'
import './BookingPanel.css'

const TIME_SLOTS = [
  '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
  '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00',
  '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00',
]

function BookingPanel({
  selectedDate,
  onDateChange,
  timeSlotStatuses,
  selectedTimeSlots,
  onTimeSlotClick,
  onReserve,
  onRestart,
}) {
  const timeSlotsRef = useRef(null)
  const [groupSize, setGroupSize] = useState(1)
  const [groupDropdownOpen, setGroupDropdownOpen] = useState(false)

  function formatDate(date) {
    if (!date) return 'Zgjidh datën'
    return date.toLocaleDateString('sq-AL', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  function handleTimeSlotClick(index) {
    onTimeSlotClick(index)
    setTimeout(() => {
      if (timeSlotsRef.current) {
        timeSlotsRef.current.scrollTop = 0
      }
    }, 2000)
  }

  return (
    <div className="booking-panel">
      <h4>Paneli i Rezervimit</h4>

      {/* 1. DATE */}
      <Calendar
        selectedDate={selectedDate}
        onDateSelect={onDateChange}
        formattedDate={formatDate(selectedDate)}
      />

      {/* 2. TIME SLOTS */}
      <div className="oraret-label">Oraret:</div>

      <div className="time-slots" ref={timeSlotsRef}>
        {TIME_SLOTS.map((slot, index) => {
          const isBooked = timeSlotStatuses[index] === 'booked'
          const isSelected = Array.isArray(selectedTimeSlots) && selectedTimeSlots.includes(index)

          let className = 'time-slot'
          if (isBooked) {
            className += ' booked'
          } else if (isSelected) {
            className += ' available selected'
          } else {
            className += ' available'
          }

          return (
            <div
              key={index}
              className={className}
              onClick={() => handleTimeSlotClick(index)}
            >
              <div className="time-text">{slot}</div>
              <small>{isBooked ? 'E zënë' : 'E lirë'}</small>
            </div>
          )
        })}
      </div>

      {/* 3. GROUP SIZE — custom dropdown */}
      <div className="group-size">
        <label>Numri i personave:</label>
        <div
          className={`custom-select${groupDropdownOpen ? ' open' : ''}`}
          onClick={() => setGroupDropdownOpen(p => !p)}
        >
          <div className="custom-select-value">
            <span>{groupSize} {groupSize === 1 ? 'person' : 'persona'}</span>
            <span className="material-icons custom-select-arrow">expand_more</span>
          </div>
          {groupDropdownOpen && (
            <ul className="custom-select-list">
              {Array.from({ length: 15 }, (_, i) => (
                <li
                  key={i + 1}
                  className={`custom-select-option${groupSize === i + 1 ? ' selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setGroupSize(i + 1)
                    setGroupDropdownOpen(false)
                  }}
                >
                  {i + 1} {i === 0 ? 'person' : 'persona'}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button className="reserve-btn" onClick={() => onReserve(groupSize)}>
        KONFIRMO ORARIN
      </button>

      {onRestart && (
        <button
          type="button"
          className="restart-btn"
          onClick={() => {
            onRestart()
            setGroupSize(1)
          }}
        >
          Rifillo rezervimin
        </button>
      )}
    </div>
  )
}

export default BookingPanel
