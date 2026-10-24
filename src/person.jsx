function Person({ contact, onDelete, onEdit }) {
  return (
    <li className="contact-row">
      <span className="avatar" aria-hidden="true">{contact.name.charAt(0).toUpperCase()}</span>
      <div className="contact-details">
        <strong>{contact.name}</strong>
        <a href={`tel:${contact.number.replace(/[^\d+]/g, '')}`}>{contact.number}</a>
      </div>
      <div className="contact-actions">
        <button
          className="edit-button"
          type="button"
          onClick={() => onEdit(contact)}
          aria-label={`Edit ${contact.name}`}
          title={`Edit ${contact.name}`}
        >
          Edit
        </button>
        <button
          className="delete-button"
          type="button"
          onClick={() => onDelete(contact.id, contact.name)}
          aria-label={`Delete ${contact.name}`}
          title={`Delete ${contact.name}`}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </li>
  )
}

export default Person