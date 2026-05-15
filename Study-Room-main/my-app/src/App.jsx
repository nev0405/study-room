import { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import SeatsGrid from './components/SeatsGrid'
import BookingPanel from './components/BookingPanel'
import Modal from './components/Modal'
import './App.css'

const API_URL = "http://localhost:8080/api/bookings" 
const ROOM_CODE = 'SR001'
const TOTAL_SEATS = 15

const TIME_SLOTS = [
  '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
  '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00',
  '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00',
]

function toLocalIsoDate(date) {
  if (!date) return ''
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function bookingOverlapsSlots(booking, slots) {
  if (!slots.length) return true
  return slots.some(slot => slot >= booking.startSlot && slot <= booking.endSlot)
}

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [emailPopupOpen, setEmailPopupOpen] = useState(true)
  const [rulesModalOpen, setRulesModalOpen] = useState(false)
  const [reservationPopup, setReservationPopup] = useState({ open: false, title: '', text: '' })
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([])
  const [selectedSeats, setSelectedSeats] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)

  const seatStatuses = Array.from({ length: TOTAL_SEATS }, (_, index) => {
    const seatNumber = index + 1
    const isBooked = bookings.some(booking =>
      booking.seatNumber === seatNumber && bookingOverlapsSlots(booking, selectedTimeSlots)
    )
    return isBooked ? 'booked' : 'available'
  })

  const timeSlotStatuses = TIME_SLOTS.map((_, slotIndex) => {
    const bookedSeatsForSlot = new Set(
      bookings
        .filter(booking => slotIndex >= booking.startSlot && slotIndex <= booking.endSlot)
        .map(booking => booking.seatNumber)
    )
    return bookedSeatsForSlot.size >= TOTAL_SEATS ? 'booked' : 'available'
  })

  useEffect(() => {
    async function loadBookings() {
      if (!selectedDate) {
        setBookings([])
        return
      }

      setLoading(true)
      try {
        const response = await fetch(`${API_URL}?roomCode=${ROOM_CODE}&date=${toLocalIsoDate(selectedDate)}`)
        const data = await response.json()
        setBookings(data)
      } catch (error) {
        setReservationPopup({
          open: true,
          title: '❌ Backend nuk u lidh',
          text: 'Sigurohu që projekti Java Spring Boot po punon në http://localhost:8080.',
        })
      } finally {
        setLoading(false)
      }
    }

    loadBookings()
  }, [selectedDate])

  function handleSeatClick(index) {
    if (seatStatuses[index] === 'booked') {
      alert('❌ Kjo karrige është e zënë për orarin e zgjedhur!')
      return
    }
    setSelectedSeats(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  function handleTimeSlotClick(index) {
    if (timeSlotStatuses[index] === 'booked') return
    setSelectedTimeSlots(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index)
      }

      if (prev.length >= 3) {
        alert('Maksimumi mund të rezervoni 3 orë rresht.')
        return prev
      }

      const next = [...prev, index].sort((a, b) => a - b)
      const span = next[next.length - 1] - next[0] + 1
      if (span !== next.length) {
        alert('Oraret duhet të jenë njëra pas tjetrës (maksimumi 3).')
        return prev
      }

      return next
    })
  }

  async function makeReservation(groupSize = 1) {
    if (!selectedDate) {
      setReservationPopup({ open: true, title: '❌ Gabim', text: 'Ju lutem zgjidhni një datë.' })
      return
    }
    if (selectedTimeSlots.length === 0) {
      setReservationPopup({ open: true, title: '❌ Gabim', text: 'Ju lutem zgjidhni të paktën një orar (deri në 3).' })
      return
    }
    if (selectedSeats.length === 0) {
      setReservationPopup({ open: true, title: '❌ Gabim', text: 'Ju lutem zgjidhni të paktën një vend.' })
      return
    }
    if (selectedSeats.length !== groupSize) {
      setReservationPopup({
        open: true,
        title: '❌ Gabim',
        text: `Numri i vendeve të zgjedhura (${selectedSeats.length}) duhet të përputhet me numrin e personave (${groupSize}).`,
      })
      return
    }

    const sortedSelected = [...selectedTimeSlots].sort((a, b) => a - b)
    const selectedLabels = sortedSelected.map(i => TIME_SLOTS[i])
    const firstStart = selectedLabels[0].split('-')[0]
    const lastEnd = selectedLabels[selectedLabels.length - 1].split('-')[1]
    const timeText = selectedLabels.length === 1 ? selectedLabels[0] : `${firstStart}-${lastEnd}`
    const dateText = selectedDate.toLocaleDateString('sq-AL')

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roomCode: ROOM_CODE,
          seatNumbers: selectedSeats.map(index => index + 1),
          bookingDate: toLocalIsoDate(selectedDate),
          timeSlots: sortedSelected,
          groupSize,
          studentName: 'Student',
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Rezervimi nuk u krye.')
      }

      const savedBookings = await response.json()
      setBookings(prev => [...prev, ...savedBookings])
      setReservationPopup({
        open: true,
        title: '✅ Rezervimi u konfirmua',
        text: `Salla ${ROOM_CODE} është rezervuar për datën ${dateText} në orarin ${timeText}. Vende të rezervuara: ${selectedSeats.length}`,
      })
      setSelectedSeats([])
      setSelectedTimeSlots([])
    } catch (error) {
      setReservationPopup({ open: true, title: '❌ Gabim', text: error.message })
    }
  }

  function restartReservation() {
    setSelectedDate(null)
    setSelectedTimeSlots([])
    setSelectedSeats([])
    setBookings([])
  }

  return (
    <>
      {emailPopupOpen && (
        <Modal onClose={() => setEmailPopupOpen(false)}>
          <h2>Hyrje në Study Room</h2>
          <button type="button" className="popup-btn" onClick={() => setEmailPopupOpen(false)}>Vazhdo</button>
        </Modal>
      )}

      {rulesModalOpen && (
        <Modal onClose={() => setRulesModalOpen(false)}>
          <h2>Study Room Rules</h2>
          <ul>
            <li>Maksimumi 3 orë rezervim.</li>
            <li>Numri maksimal i personave është 15.</li>
            <li>Anulo 30 minuta para nëse nuk paraqitesh.</li>
            <li>Respektoni qetësinë.</li>
            <li>Lëreni hapsirën të pastër pas përdorimit.</li>
          </ul>
        </Modal>
      )}

      {reservationPopup.open && (
        <Modal onClose={() => setReservationPopup(p => ({ ...p, open: false }))}>
          <h2>{reservationPopup.title}</h2>
          <p>{reservationPopup.text}</p>
        </Modal>
      )}

      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(p => !p)} />

      {sidebarCollapsed && (
        <button className="mobile-menu-btn" onClick={() => setSidebarCollapsed(false)} title="Hap menunë">
          <span>☰</span>
        </button>
      )}

      <div className={`main-content${sidebarCollapsed ? ' sidebar-collapsed' : ''}`}>
        <div className="header">
          <div className="room-info">
            <div>
              <h1 className="room-title">StudyRoom Rezervim</h1>
              <p className="room-subtitle">Rezervoni StudyRoomin tuaj deri në 3 orë</p>
            </div>
            <button className="view-rules-btn" onClick={() => setRulesModalOpen(true)}>Shiko Rregullat!</button>
          </div>
          <div className="instructions">
            <strong>
              📌 Study Room është një hapësirë e dedikuar për studim individual ose në grup, ku studentët
              mund të rezervojnë vende për të punuar në qetësi dhe për t&apos;u përqendruar në aktivitetet akademike.
            </strong>
          </div>
        </div>

        <div className="seats-container">
          <div className="room-header">
            <h3 style={{ color: '#1E3A8A', marginBottom: '1rem' }}>Salla 001 — 15 Vende</h3>
            {loading && <small>Duke marrë rezervimet nga Java...</small>}
          </div>
          <div className="room-grid">
            <SeatsGrid seatStatuses={seatStatuses} selectedSeats={selectedSeats} onSeatClick={handleSeatClick} />
            <BookingPanel
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              timeSlotStatuses={timeSlotStatuses}
              selectedTimeSlots={selectedTimeSlots}
              onTimeSlotClick={handleTimeSlotClick}
              onReserve={makeReservation}
              onRestart={restartReservation}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
