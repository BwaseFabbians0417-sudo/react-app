import { useEffect, useState } from 'react'

function Product() {
    const [products, setProducts] = useState([])
    const [status, setStatus] = useState('loading')

    useEffect(() => {
        const controller = new AbortController()

        async function loadProducts() {
            try {
                const response = await fetch('https://fakestoreapi.com/products', {
                    signal: controller.signal,
                })
                if (!response.ok) throw new Error('Could not load products')

                const productList = await response.json()
                setProducts(productList)
                setStatus('success')
            } catch {
                if (!controller.signal.aborted) setStatus('error')
            }
        }

        loadProducts()
        return () => controller.abort()
    }, [])

    return (
        <section className="panel products-panel" aria-labelledby="products-title">
            <div className="panel-heading">
                <span className="heading-icon products-icon" aria-hidden="true">⌑</span>
                <div>
                    <h2 id="products-title">Products</h2>
                    <p>Browse the latest items from the store.</p>
                </div>
            </div>

            {status === 'loading' && <p className="products-message">Loading products...</p>}
            {status === 'error' && (
                <p className="products-message" role="alert">Products could not be loaded. Please try again later.</p>
            )}
            {status === 'success' && (
                <ul className="product-list">
                    {products.map((product) => (
                        <li className="product-item" key={product.id}>
                            <img src={product.image} alt={product.title} loading="lazy" />
                            <div className="product-details">
                                <h3>{product.title}</h3>
                                <p>{product.description}</p>
                                <p>${product.price.toFixed(2)}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}

export default Product