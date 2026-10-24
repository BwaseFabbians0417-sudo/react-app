import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import NotFound from './NotFound'

function ProductDetail({ cart, cartCount, onAddToCart, productId: productIdProp }) {
  const { productId: routeProductId } = useParams()
  const productId = productIdProp ?? routeProductId
  const [product, setProduct] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const controller = new AbortController()

    async function loadProduct() {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
          signal: controller.signal,
        })
        if (response.status === 404) {
          setStatus('not-found')
          return
        }
        if (!response.ok) throw new Error('Could not load product')

        const productDetails = await response.json()
        if (!productDetails?.id) {
          setStatus('not-found')
          return
        }

        setProduct(productDetails)
        setStatus('success')
      } catch {
        if (!controller.signal.aborted) setStatus('error')
      }
    }

    loadProduct()
    return () => controller.abort()
  }, [productId])

  return (
    <main className="app-shell product-detail-page">
      <header className="topbar product-detail-topbar">
        <Link className="product-back-button" to="/products">&larr; All products</Link>
        <Link className="product-cart-summary" to="/cart" aria-label={`Cart with ${cartCount} items`}>
          Cart: {cartCount} {cartCount === 1 ? 'item' : 'items'}
        </Link>
      </header>
      {status === 'loading' && <p className="products-message">Loading product...</p>}
      {status === 'error' && (
        <p className="products-message" role="alert">Product could not be loaded. Please try again later.</p>
      )}
      {status === 'not-found' && (
        <NotFound
          title="Product not found"
          message="That product number isn't in our collection. Browse all products to find something else."
          searchTerm={`product${productId}`}
        />
      )}
      {status === 'success' && product && (
        <article className="product-detail-view">
          <div className="product-detail-image-wrap">
            <img className="product-detail-image" src={product.image} alt={product.title} />
          </div>
          <div className="product-detail-copy">
            {product.category && <p className="product-category">{product.category}</p>}
            <h1>{product.title}</h1>
            <p className="product-detail-description">{product.description}</p>
            <div className="product-purchase-row product-detail-purchase-row">
              <span className="product-price">${product.price.toFixed(2)}</span>
              <button
                className="add-to-cart-button"
                type="button"
                aria-label={`Add ${product.title} to cart`}
                onClick={() => onAddToCart(product.id)}
              >
                Add to cart
                {cart[product.id] > 0 && <span className="cart-quantity">{cart[product.id]}</span>}
              </button>
            </div>
          </div>
        </article>
      )}
    </main>
  )
}

export default ProductDetail