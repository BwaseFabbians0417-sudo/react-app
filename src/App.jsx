import { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useRoutes } from 'react-router-dom'
import './App.css'
import NavLinks from './nav-link'
import ContactForm from './form'
import ContactSearch from './search'
import Person from './person'
import Product from './components/product'
import ProductDetail from './components/ProductDetail'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import AccountPage from './pages/AccountPage'
import CartPage from './pages/CartPage'
import LoadingImage from './components/loading img'

function AppFallback({ cart, cartCount, onAddToCart }) {
  const { pathname } = useLocation()
  const productMatch = pathname.match(/(?:^|\/)product(\d+)\/?$/)

  if (productMatch) {
    return (
      <ProductDetail
        productId={productMatch[1]}
        cart={cart}
        cartCount={cartCount}
        onAddToCart={onAddToCart}
      />
    )
  }

  return <Navigate to="/" replace />
}

function App() {
  const [search, setSearch] = useState('')
  const [editingContact, setEditingContact] = useState(null)
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem('good-finds-cart') ?? '{}')
      if (!savedCart || typeof savedCart !== 'object' || Array.isArray(savedCart)) return {}

      return Object.fromEntries(
        Object.entries(savedCart).filter(([, quantity]) => Number.isInteger(quantity) && quantity > 0),
      )
    } catch {
      return {}
    }
  })
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

  function handleAddToCart(productId) {
    setCart((currentCart) => ({
      ...currentCart,
      [productId]: (currentCart[productId] ?? 0) + 1,
    }))
  }

  const cartCount = Object.values(cart).reduce((total, quantity) => total + quantity, 0)

  useEffect(() => {
    try {
      localStorage.setItem('good-finds-cart', JSON.stringify(cart))
    } catch {
      return
    }
  }, [cart])

  function handleChangeCartQuantity(productId, quantity) {
    setCart((currentCart) => {
      if (quantity <= 0) {
        const nextCart = { ...currentCart }
        delete nextCart[productId]
        return nextCart
      }

      return { ...currentCart, [productId]: quantity }
    })
  }

  function handleRemoveFromCart(productId) {
    setCart((currentCart) => {
      const nextCart = { ...currentCart }
      delete nextCart[productId]
      return nextCart
    })
  }

  function handleClearCart() {
    setCart({})
  }

  const normalizedSearch = search.trim().toLowerCase()
  const personsToShow = person.filter((contact) =>
    `${contact.name} ${contact.number}`.toLowerCase().includes(normalizedSearch),
  )

  const routes = useRoutes([
    { path: '/', element: <HomePage /> },
    {
      path: '/contacts',
      element: (
    <main className="app-shell">
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
    </main>
      ),
    },
    {
      path: '/products',
      element: (
        <div className="app-shell products-route">
          <Product cart={cart} cartCount={cartCount} onAddToCart={handleAddToCart} />
        </div>
      ),
    },
    {
      path: '/products/:productId',
      element: <ProductDetail cart={cart} cartCount={cartCount} onAddToCart={handleAddToCart} />,
    },
    { path: '/about', element: <AboutPage /> },
    {
      path: '/account',
      element: <AccountPage cartCount={cartCount} contactCount={person.length} />,
    },
    {
      path: '/cart',
      element: (
        <CartPage
          cart={cart}
          cartCount={cartCount}
          onChangeQuantity={handleChangeCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onClearCart={handleClearCart}
        />
      ),
    },
    {
      path: '*',
      element: (
        <AppFallback
          cart={cart}
          cartCount={cartCount}
          onAddToCart={handleAddToCart}
        />
      ),
    },
  ])

  return (
    <LoadingImage>
      <div className="site-shell">
        <header className="site-header">
          <Link className="brand" to="/" aria-label="Good Finds home">
            <span className="brand-mark" aria-hidden="true">G</span>
            <span>Good Finds</span>
          </Link>
          <NavLinks cartCount={cartCount} />
        </header>
        <div className="route-content">{routes}</div>
        <footer className="site-footer">
          <Link className="footer-brand" to="/">Good Finds</Link>
          <p>A thoughtful edit of everyday essentials.</p>
          <nav className="site-footer-links" aria-label="Footer navigation">
            <Link to="/products">Products</Link>
            <Link to="/about">About</Link>
            <Link to="/contacts">Contacts</Link>
          </nav>
          <small>&copy; {new Date().getFullYear()} Good Finds</small>
        </footer>
      </div>
    </LoadingImage>
  )
}

export default App
