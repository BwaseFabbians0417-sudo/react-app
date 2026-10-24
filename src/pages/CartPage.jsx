import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

function CartPage({ cart, cartCount, onChangeQuantity, onRemoveItem, onClearCart }) {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState('loading')
  const [checkoutMessage, setCheckoutMessage] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products', {
          signal: controller.signal,
        })
        if (!response.ok) throw new Error('Could not load cart products')
        setProducts(await response.json())
        setStatus('success')
      } catch {
        if (!controller.signal.aborted) setStatus('error')
      }
    }

    loadProducts()
    return () => controller.abort()
  }, [])

  const cartItems = useMemo(
    () => products.filter((product) => cart[product.id] > 0),
    [products, cart],
  )
  const subtotal = cartItems.reduce((total, product) => total + product.price * cart[product.id], 0)

  return (
    <main className="commerce-page cart-page">
      <header className="commerce-heading">
        <div>
          <p className="commerce-kicker">YOUR SELECTION</p>
          <h1>Shopping cart</h1>
          <p>{cartCount} {cartCount === 1 ? 'item' : 'items'} in your bag</p>
        </div>
        {cartItems.length > 0 && status === 'success' && (
          <button className="text-action" type="button" onClick={onClearCart}>Clear cart</button>
        )}
      </header>

      {status === 'loading' && <p className="commerce-message">Loading your cart...</p>}
      {status === 'error' && <p className="commerce-message" role="alert">Your cart could not be loaded. Please try again.</p>}
      {status === 'success' && cartItems.length === 0 && (
        <section className="cart-empty" aria-labelledby="cart-empty-title">
          <span className="cart-empty-mark" aria-hidden="true">○</span>
          <h2 id="cart-empty-title">Your cart is waiting</h2>
          <p>Browse the collection and add something you like.</p>
          <Link className="store-button" to="/products">Explore products</Link>
        </section>
      )}

      {status === 'success' && cartItems.length > 0 && (
        <div className="cart-layout">
          <section className="cart-items" aria-label="Items in your cart">
            {cartItems.map((product) => (
              <article className="cart-line" key={product.id}>
                <Link className="cart-line-image" to={`/product${product.id}`} aria-label={`View ${product.title}`}>
                  <img src={product.image} alt="" />
                </Link>
                <div className="cart-line-details">
                  <p className="cart-line-category">{product.category}</p>
                  <h2><Link to={`/product${product.id}`}>{product.title}</Link></h2>
                  <p className="cart-line-unit-price">${product.price.toFixed(2)} each</p>
                  <button className="text-action cart-remove" type="button" onClick={() => onRemoveItem(product.id)}>
                    Remove
                  </button>
                </div>
                <div className="quantity-control" aria-label={`Quantity for ${product.title}`}>
                  <button
                    type="button"
                    aria-label={`Decrease ${product.title} quantity`}
                    title="Decrease quantity"
                    onClick={() => onChangeQuantity(product.id, cart[product.id] - 1)}
                  >
                    −
                  </button>
                  <span aria-live="polite">{cart[product.id]}</span>
                  <button
                    type="button"
                    aria-label={`Increase ${product.title} quantity`}
                    title="Increase quantity"
                    onClick={() => onChangeQuantity(product.id, cart[product.id] + 1)}
                  >
                    +
                  </button>
                </div>
                <strong className="cart-line-total">${(product.price * cart[product.id]).toFixed(2)}</strong>
              </article>
            ))}
            <Link className="continue-shopping" to="/products">&larr; Continue shopping</Link>
          </section>

          <aside className="order-summary" aria-labelledby="order-summary-title">
            <h2 id="order-summary-title">Order summary</h2>
            <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="summary-row"><span>Shipping</span><span>Free</span></div>
            <div className="summary-total"><span>Total</span><strong>${subtotal.toFixed(2)}</strong></div>
            <button
              className="checkout-button"
              type="button"
              onClick={() => setCheckoutMessage('Checkout is a demo; payment processing is not connected.')}
            >
              Continue to checkout
            </button>
            {checkoutMessage && <p className="checkout-message" role="status">{checkoutMessage}</p>}
            <p className="summary-note">Shipping and taxes are confirmed at checkout.</p>
          </aside>
        </div>
      )}
    </main>
  )
}

export default CartPage