import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [person, setPerson] = useState([
    { id: 1, name: 'Jackson', number: '010 5628 5628 67' },
    { id: 2, name: 'Felix', number: '090 1244 678' },
  ])

  function handleSubmit(event) {
    event.preventDefault()
    const cleanName = name.trim()
    const cleanNumber = number.trim()

    if (!cleanName || !cleanNumber) {
      setError('Please enter both a name and a phone number.')
      return
    }

    setPerson((people) => [
      ...people,
      {
        id: people.reduce((highestId, person) => Math.max(highestId, person.id), 0) + 1,
        name: cleanName,
        number: cleanNumber,
      },
    ])
    setName('')
    setNumber('')
    setError('')
  }

  function handleDelete(id) {
    setPerson((people) => people.filter((person) => person.id !== id))
  }

  const normalizedSearch = search.trim().toLowerCase()
  const personsToShow = person.filter((contact) =>
    `${contact.name} ${contact.number}`.toLowerCase().includes(normalizedSearch),
  )

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Contacts List home">
          <span className="brand-mark" aria-hidden="true">C</span>
          <span>Contacts List</span>
        </a>
        <span className="topbar-note"><span className="status-dot" /> Your contacts, all in one place</span>
      </header>

      <section className="welcome">
        <div>
          <p className="eyebrow">YOUR PERSONAL DIRECTORY</p>
          <h1>Keep your people close.</h1>
          <p className="welcome-copy">A simple, thoughtful place for the people you want to stay in touch with.</p>
        </div>
        <div className="contact-summary" aria-label={`${person.length} saved contacts`}>
          <span className="summary-icon" aria-hidden="true">↗</span>
          <span><strong>{person.length}</strong><small>{person.length === 1 ? 'saved contact' : 'saved contacts'}</small></span>
        </div>
      </section>

      <section className="dashboard" aria-label="Phonebook">
        <aside className="panel add-panel">
          <div className="panel-heading">
            <span className="heading-icon add-icon" aria-hidden="true">＋</span>
            <div>
              <h2>Add someone</h2>
              <p>Save a new person to your list.</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Alex Morgan"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <label htmlFor="number">Phone number</label>
            <input
              id="number"
              name="number"
              type="tel"
              placeholder="e.g. +1 555 010 2030"
              autoComplete="tel"
              value={number}
              onChange={(event) => setNumber(event.target.value)}
            />
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="primary-button" type="submit">
              <span aria-hidden="true">＋</span> Add contact
            </button>
          </form>

          <div className="privacy-note">
            <span aria-hidden="true">✦</span>
            <p>Your contacts stay right here in your browser.</p>
          </div>
        </aside>

        <section className="panel contacts-panel" aria-labelledby="contacts-title">
          <div className="contacts-heading">
            <div className="panel-heading">
              <span className="heading-icon people-icon" aria-hidden="true">♡</span>
              <div>
                <h2 id="contacts-title">Your contacts</h2>
                <p>A little list of your favorite people.</p>
              </div>
            </div>
            <span className="count-pill">{person.length}</span>
          </div>

          <label className="search-box" htmlFor="search">
            <span aria-hidden="true">⌕</span>
            <input
              id="search"
              name="search"
              type="search"
              placeholder="Search name or number..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <button className="clear-search" type="button" onClick={() => setSearch('')} aria-label="Clear search">
                ×
              </button>
            )}
          </label>

          {personsToShow.length > 0 ? (
            <ul className="contact-list">
              {personsToShow.map((contact) => (
                <li className="contact-row" key={contact.id}>
                  <span className="avatar" aria-hidden="true">{contact.name.charAt(0).toUpperCase()}</span>
                  <div className="contact-details">
                    <strong>{contact.name}</strong>
                    <a href={`tel:${contact.number.replace(/[^\d+]/g, '')}`}>{contact.number}</a>
                  </div>
                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => handleDelete(contact.id)}
                    aria-label={`Delete ${contact.name}`}
                    title={`Delete ${contact.name}`}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <span className="empty-icon" aria-hidden="true">{person.length === 0 ? '♡' : '⌕'}</span>
              <h3>{person.length === 0 ? 'Your list is ready for its first hello.' : 'No contacts found'}</h3>
              <p>{person.length === 0 ? 'Add someone you would like to keep close.' : 'Try another name or phone number.'}</p>
            </div>
          )}

          <p className="list-footnote">
            Showing {personsToShow.length} of {person.length} {person.length === 1 ? 'contact' : 'contacts'}
          </p>
        </section>
      </section>
      <footer className="page-footer">Made for the people who matter.</footer>
    </main>
  )
}

export default App
