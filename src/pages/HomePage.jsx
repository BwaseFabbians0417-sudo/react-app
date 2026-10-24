import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import heroFallback from '../assets/hero.png'

function HomePage() {
  const [featuredImage, setFeaturedImage] = useState(heroFallback)

  useEffect(() => {
    const controller = new AbortController()

    async function loadFeaturedProduct() {
      try {
        const response = await fetch('https://fakestoreapi.com/products/1', {
          signal: controller.signal,
        })
        if (!response.ok) return

        const product = await response.json()
        if (product.image) setFeaturedImage(product.image)
      } catch {
        if (!controller.signal.aborted) setFeaturedImage(heroFallback)
      }
    }

    loadFeaturedProduct()
    return () => controller.abort()
  }, [])

  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <img className="home-hero-image" src={featuredImage} alt="" />
        <div className="home-hero-shade" aria-hidden="true" />
        <div className="home-hero-copy">
          <p className="home-kicker">GOOD FINDS FOR EVERYDAY LIVING</p>
          <h1 id="home-title">Welcome to home page</h1>
          <p className="home-intro">
            Explore useful, considered finds and discover something that feels just right.
          </p>
          <div className="home-actions">
            <Link className="home-primary-link" to="/products">Explore products <span aria-hidden="true">&rarr;</span></Link>
            <Link className="home-secondary-link" to="/about">Meet us</Link>
          </div>
        </div>
        <span className="home-image-caption">A thoughtful edit of everyday essentials</span>
      </section>

      <section className="home-next" aria-label="Explore the collection">
        <div>
          <p className="home-next-kicker">THE COLLECTION</p>
          <h2>Good things, one find at a time.</h2>
        </div>
        <Link className="home-next-link" to="/products" aria-label="Browse all products">Browse all products <span aria-hidden="true">&rarr;</span></Link>
      </section>
    </div>
  )
}

export default HomePage