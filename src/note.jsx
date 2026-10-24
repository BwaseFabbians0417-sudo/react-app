import { useState } from 'react'

function NotePad() {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [notes, setNotes] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const cleanTitle = title.trim()
    const cleanMessage = message.trim()
    if (!cleanTitle || !cleanMessage) {
      setError('Please enter both a title and a message.')
      setSubmitted(false)
      return
    }

    const note = {
      id: notes.length + 1,
      title: cleanTitle,
      message: cleanMessage,
    }

    setNotes((currentNotes) => [...currentNotes, note])
    setTitle('')
    setMessage('')
    setError('')
    setSubmitted(true)
  }

  function handleClearDraft() {
    setTitle('')
    setMessage('')
    setError('')
    setSubmitted(false)
  }

  return (
    <section className="panel notepad" aria-labelledby="notepad-title">
      <div className="notepad-heading">
        <div>
          <p className="notepad-label">PERSONAL NOTES</p>
          <h2 id="notepad-title">NOTEAPP</h2>
          <p>Test Renovation Of Community School.</p>
        </div>
        {(title || message) && (
          <button
            className="secondary-button notepad-clear"
            type="button"
            onClick={handleClearDraft}
          >
            Clear draft
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <label className="notepad-field-label" htmlFor="note-title">Note title</label>
        <input
          id="note-title"
          className="notepad-title-input"
          type="text"
          placeholder="Give your note a title"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
            setError('')
            setSubmitted(false)
          }}
          required
        />
        <label className="notepad-field-label" htmlFor="note-message">Note message</label>
        <textarea
          id="note-message"
          className="notepad-input"
          placeholder="Write your note here..."
          value={message}
          onChange={(event) => {
            setMessage(event.target.value)
            setError('')
            setSubmitted(false)
          }}
          required
        />
        <button className="primary-button notepad-submit" type="submit">Submit</button>
        {error && <p className="form-error" role="alert">{error}</p>}
        {submitted && <p className="notepad-status" role="status">Your note has been submitted.</p>}
      </form>

      <p className="notepad-count">{message.length} message characters</p>

      {notes.length > 0 && (
        <div className="saved-notes" aria-live="polite">
          <h3>Saved notes</h3>
          <ul>
            {notes.map((note) => (
              <li className="saved-note" key={note.id}>
                <h4>{note.title}</h4>
                <p>{note.message}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}

export default NotePad