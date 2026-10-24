import { Link } from 'react-router-dom'

function NotFound({ title, message, searchTerm, onClearSearch }) {
  return (
    <section className="not-found" role="status">
      <span className="not-found-code" aria-hidden="true">404</span>
      <div>
        <h2>{title}</h2>
        <p>{message}</p>
        {searchTerm && <p className="not-found-query">Search: “{searchTerm}”</p>}
        <div className="not-found-actions">
          {onClearSearch && (
            <button className="not-found-clear" type="button" onClick={onClearSearch}>
              Clear search
            </button>
          )}
          <Link to="/products">Browse all products</Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound