import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll()
      .then(setPersons)
      .catch(() => setNotification({ type: "error", text: "Could not load contacts." }));
  }, []);

  useEffect(() => {
    if (!notification) return undefined;
    const timer = setTimeout(() => setNotification(null), 4000);
    return () => clearTimeout(timer);
  }, [notification]);

  const showNotification = (type, text) => setNotification({ type, text });

  const handleSubmit = (event) => {
    event.preventDefault();
    const contact = { name: newPerson.name.trim(), number: newPerson.number.trim() };
    if (!contact.name || !contact.number) return;

    const existing = persons.find((person) => person.name.toLowerCase() === contact.name.toLowerCase());
    const save = existing
      ? window.confirm(`${existing.name} is already in the phonebook. Replace the number?`)
        ? personService.update(existing.id, contact)
        : null
      : personService.create(contact);
    if (!save) return;

    save.then((savedPerson) => {
      setPersons((current) => existing
        ? current.map((person) => person.id === savedPerson.id ? savedPerson : person)
        : current.concat(savedPerson));
      setNewPerson({ name: "", number: "" });
      showNotification("success", `${savedPerson.name} ${existing ? "updated" : "added"}.`);
    }).catch((error) => {
      if (error.response?.status === 404 && existing) {
        setPersons((current) => current.filter((person) => person.id !== existing.id));
        showNotification("error", `${existing.name} was already removed from the server.`);
      } else {
        showNotification("error", error.response?.data?.error || "Could not save this contact.");
      }
    });
  };

  const handleRemove = (person) => {
    if (!window.confirm(`Delete ${person.name} from the phonebook?`)) return;
    personService.remove(person.id).then(() => {
      setPersons((current) => current.filter((item) => item.id !== person.id));
      showNotification("success", `${person.name} deleted.`);
    }).catch((error) => {
      if (error.response?.status === 404) {
        setPersons((current) => current.filter((item) => item.id !== person.id));
        showNotification("success", `${person.name} deleted.`);
      } else showNotification("error", "Could not delete this contact.");
    });
  };

  return (
    <main className="phonebook-app">
      <header className="page-heading">
        <p className="eyebrow">Your contacts</p>
        <h1>Phonebook</h1>
        <p className="intro">Keep the people you need close at hand.</p>
      </header>
      <Notification notification={notification} />
      <section className="phonebook-panel">
        <Filter filterStr={filter} handleChangeFilter={(event) => setFilter(event.target.value)} />
        <PersonForm newPerson={newPerson} handleSubmit={handleSubmit} handleFormChange={(event) => {
          const { name, value } = event.target;
          setNewPerson((current) => ({ ...current, [name]: value }));
        }} />
      </section>
      <section className="contacts-section">
        <div className="section-heading">
          <div><p className="eyebrow">Directory</p><h2>Contacts</h2></div>
          <span className="contact-count">{persons.length} {persons.length === 1 ? "person" : "people"}</span>
        </div>
        <Persons filterStr={filter} allPersons={persons} handleRemove={handleRemove} />
      </section>
    </main>
  );
};

export default App;
