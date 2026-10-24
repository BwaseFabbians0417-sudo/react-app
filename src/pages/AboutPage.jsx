import { Link } from 'react-router-dom'

function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-intro">
        <p className="about-kicker">A LITTLE ABOUT US</p>
        <h1>About us</h1>
        <p className="about-lead">
          We believe the things we use every day should be useful, thoughtfully chosen, and a pleasure to find.
        </p>
      </section>

      <section className="about-story" aria-labelledby="about-story-title">
        <p className="about-story-label">OUR POINT OF VIEW</p>
        <div>
          <h2 id="about-story-title">Less searching.<br />More finding.</h2>
          <p>
            This is a simple place to explore everyday products without the noise. Browse at your own pace,
            open the details that matter, and keep track of the pieces you like.
          </p>
        </div>
      </section>

      <section className="about-values" aria-label="What matters to us">
        <article>
          <span>01</span>
          <h2>Useful first</h2>
          <p>Clear product details help you decide what belongs in your day.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Easy to explore</h2>
          <p>A calm, straightforward experience from the first click to the product page.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Made for people</h2>
          <p>Thoughtful details make a small everyday task feel a little better.</p>
        </article>
      </section>

      <Link className="about-products-link" to="/products">Explore the collection <span aria-hidden="true">&rarr;</span></Link>
    </div>
  )
}

export default AboutPage