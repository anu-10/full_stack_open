const Persons = ({ filterStr, allPersons, handleRemove }) => {
  const matches = allPersons.filter((person) => person.name.toLowerCase().includes(filterStr.trim().toLowerCase()));

  if (matches.length === 0) {
    return <p className="empty-state">{allPersons.length ? "No contacts match your search." : "Your phonebook is empty. Add your first contact above."}</p>;
  }

  return (
    <ul className="contact-list">
      {matches.map((person) => (
        <li className="contact-row" key={person.id}>
          <div className="contact-avatar" aria-hidden="true">{person.name.charAt(0).toUpperCase()}</div>
          <div className="contact-details"><strong>{person.name}</strong><a href={`tel:${person.number}`}>{person.number}</a></div>
          <button className="button button--quiet" type="button" onClick={() => handleRemove(person)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
