function ContactSearch({ search, onSearchChange }) {
  return (
    <label className="search-box" htmlFor="search">
      <span aria-hidden="true">⌕</span>
      <input
        id="search"
        name="search"
        type="search"
        placeholder="Search name or number..."
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />
      {search && (
        <button
          className="clear-search"
          type="button"
          onClick={() => onSearchChange('')}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </label>
  )
}

export default ContactSearch