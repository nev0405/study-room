import './SeatsGrid.css'

function SeatsGrid({ seatStatuses, selectedSeats, onSeatClick }) {
  return (
    <div className="seats-visual">
      <div className="sr001-title">SR001 — 15 Vende</div>

      <div className="seats-grid">
        {seatStatuses.map((status, index) => {
          let seatClass = 'seat'
          if (status === 'booked') {
            seatClass += ' booked'
          } else if (selectedSeats.includes(index)) {
            seatClass += ' partial'
          } else {
            seatClass += ' available'
          }

          return (
            <div
              key={index}
              className={seatClass}
              onClick={() => onSeatClick(index)}
              title={`Seat ${index + 1}`}
            >
              <img src="/images/swivel-chair.png" alt={`Seat ${index + 1}`} />
            </div>
          )
        })}
      </div>

      <div className="seats-legend">
        <span className="legend available">🟢 E lirë</span>
        <span className="legend selected">🔵 Zgjedhur</span>
        <span className="legend booked">🔴 E zënë</span>
      </div>
    </div>
  )
}

export default SeatsGrid
