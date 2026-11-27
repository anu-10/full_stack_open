const PersonForm = ({ newPerson, handleSubmit, handleFormChange }) => (
  <form className="person-form" onSubmit={handleSubmit}>
    <label className="field">
      <span className="field-label">Name</span>
      <input required name="name" value={newPerson.name} onChange={handleFormChange} placeholder="e.g. Ada Lovelace" />
    </label>
    <label className="field">
      <span className="field-label">Phone number</span>
      <input required type="tel" name="number" value={newPerson.number} onChange={handleFormChange} placeholder="e.g. 040-123456" />
    </label>
    <button className="button button--primary" type="submit">Add contact <span aria-hidden="true">+</span></button>
  </form>
);

export default PersonForm;
