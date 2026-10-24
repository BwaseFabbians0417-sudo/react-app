import { useState } from 'react'
import './App.css'
import ContactForm from './form'
import ContactSearch from './search'
import Person from './person'
import NotePad from './note'
import Product from './components/product'

function App() {
  const [search, setSearch] = useState('')
  const [editingContact, setEditingContact] = useState(null)
  const [person, setPerson] = useState([
    { id: 1, name: 'Jackson', number: '010 5628 5628 67' },
    { id: 2, name: 'Felix', number: '090 1244 678' },
  ])

  function handleAddContact({ name, number }) {
    setPerson((people) => [
      ...people,
      {
        id: people.reduce((highestId, person) => Math.max(highestId, person.id), 0) + 1,
        name,
        number,
      },
    ])
  }

  function handleUpdateContact({ name, number }) {
    if (!editingContact) return

    setPerson((people) =>
      people.map((contact) =>
        contact.id === editingContact.id ? { ...contact, name, number } : contact,
      ),
    )
    setEditingContact(null)
  }

  function handleDelete(id, contactName) {
    const confirmed = window.confirm(`Are you sure you want to delete ${contactName}?`)
    if (!confirmed) return

    setPerson((people) => people.filter((person) => person.id !== id))
    if (editingContact?.id === id) setEditingContact(null)
  }

  const normalizedSearch = search.trim().toLowerCase()
  const personsToShow = person.filter((contact) =>
    `${contact.name} ${contact.number}`.toLowerCase().includes(normalizedSearch),
  )

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href={import.meta.env.BASE_URL} aria-label="Contacts List home">
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
              <h2>{editingContact ? 'Edit contact' : 'Add someone'}</h2>
              <p>{editingContact ? 'Update their name or phone number.' : 'Save a new person to your list.'}</p>
            </div>
          </div>

          <ContactForm
            key={editingContact?.id ?? 'new-contact'}
            contactToEdit={editingContact}
            onAddContact={handleAddContact}
            onUpdateContact={handleUpdateContact}
            onCancelEdit={() => setEditingContact(null)}
          />

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

          <ContactSearch search={search} onSearchChange={setSearch} />

          {personsToShow.length > 0 ? (
            <ul className="contact-list">
              {personsToShow.map((contact) => (
                <Person
                  key={contact.id}
                  contact={contact}
                  onDelete={handleDelete}
                  onEdit={setEditingContact}
                />
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
      <Product />
      <NotePad />
      <footer className="page-footer">Made for the people who matter.</footer>
    </main>
  )
}

export default App
