import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactsList } from './ContactsList/ContactsList';
import { AddContacts } from './AddContacts/AddContacts';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

export function App() {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = eve => {
    const { name, value } = eve.target;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'number') {
      setNumber(value);
    }
    if (name === 'filter') {
      setFilter(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    const prevState = contacts;

    const existingContact = prevState.some(prev =>
      prev.name.toLowerCase().includes(name.toLowerCase())
    );
    if (existingContact) {
      alert('Contact is already existing');
    } else {
      setContacts(prevState => [...prevState, newContact]);
    }
    setName('');
    setNumber('');
  };

  const handleFilter = () => {
    const result = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return result;
  };

  const handleDelete = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  useEffect(() => {
    const savedContacts = localStorage.getItem('data');
    if (savedContacts) {
      const parsedContacts = JSON.parse(savedContacts);
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(contacts));
  }, [contacts]);

  const results = handleFilter();
  return (
    <div className={css.maindiv}>
      <h1>Phonebook</h1>
      <AddContacts
        name={name}
        number={number}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <Filter handleChange={handleChange} />
      <ContactsList handleDelete={handleDelete} results={results} />
    </div>
  );
}
