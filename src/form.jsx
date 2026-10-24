import { useState } from 'react'

function ContactForm({ contactToEdit, onAddContact, onUpdateContact, onCancelEdit }) {
  const [name, setName] = useState(contactToEdit?.name ?? '')
  const [number, setNumber] = useState(contactToEdit?.number ?? '')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const cleanName = name.trim()
    const cleanNumber = number.trim()

    if (!cleanName || !cleanNumber) {
      setError('Please enter both a name and a phone number.')
      return
    }

    const contactDetails = { name: cleanName, number: cleanNumber }
    if (contactToEdit) {
      onUpdateContact(contactDetails)
    } else {
      onAddContact(contactDetails)
    }
    setName('')
    setNumber('')
    setError('')
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="name">Full name</label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="e.g. Alex Morgan"
        autoComplete="name"
        value={name}
        onChange={(event) => {
          setName(event.target.value)
          setError('')
        }}
      />

      <label htmlFor="number">Phone number</label>
      <input
        id="number"
        name="number"
        type="tel"
        placeholder="e.g. +1 555 010 2030"
        autoComplete="tel"
        value={number}
        onChange={(event) => {
          setNumber(event.target.value)
          setError('')
        }}
      />
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="form-actions">
        <button className="primary-button" type="submit">
          <span aria-hidden="true">{contactToEdit ? '✓' : '＋'}</span>
          {contactToEdit ? 'Save changes' : 'Add contact'}
        </button>
        {contactToEdit && (
          <button className="secondary-button" type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default ContactForm