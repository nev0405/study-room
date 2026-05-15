import './Modal.css'

function Modal({ children, onClose }) {
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <span className="modal-close-btn" onClick={onClose}>&times;</span>
        {children}
      </div>
    </div>
  )
}

export default Modal
