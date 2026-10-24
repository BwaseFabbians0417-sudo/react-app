import { Link } from 'react-router-dom'

function AccountPage({ cartCount, contactCount }) {
  return (
    <main className="commerce-page account-page">
      <header className="commerce-heading">
        <div>
          <p className="commerce-kicker">YOUR SPACE</p>
          <h1>Account</h1>
          <p>Your shopping and contact tools, together in one place.</p>
        </div>
      </header>

      <section className="account-overview" aria-label="Account overview">
        <article className="account-stat">
          <span className="account-stat-label">Shopping cart</span>
          <strong>{cartCount}</strong>
          <span>{cartCount === 1 ? 'item' : 'items'} in your bag</span>
          <Link to="/cart">View cart <span aria-hidden="true">&rarr;</span></Link>
        </article>
        <article className="account-stat account-stat-accent">
          <span className="account-stat-label">Contacts</span>
          <strong>{contactCount}</strong>
          <span>{contactCount === 1 ? 'contact' : 'contacts'} in your directory</span>
          <Link to="/contacts">Manage contacts <span aria-hidden="true">&rarr;</span></Link>
        </article>
      </section>

      <p className="account-note">
        Your cart is saved in this browser. Account sign-in and online checkout are not connected yet.
      </p>
    </main>
  )
}

export default AccountPage