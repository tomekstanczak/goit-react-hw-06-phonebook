import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactsList } from './ContactsList/ContactsList';
import { AddContacts } from './AddContacts/AddContacts';
import { Filter } from './Filter/Filter';
import css from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact } from '../redux/contactsSlice';
import { filtering } from '../redux/filterSlice';

export function App() {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [loading, setLoading] = useState(true);

  const handleChange = eve => {
    const { name, value } = eve.target;
    if (name === 'name') {
      setName(value);
    }
    if (name === 'number') {
      setNumber(value);
    }
    if (name === 'filter') {
      dispatch(filtering(value));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const existingContact = contacts.some(prev => prev.name === name);
    if (existingContact) {
      alert('Contact is already existing');
    } else {
      dispatch(addContact(newContact));
    }
    setName('');
    setNumber('');
  };

  const handleDelete = contactId => {
    dispatch(deleteContact(contactId));
  };

  useEffect(() => {
    const savedContacts = localStorage.getItem('data');
    if (savedContacts) {
      const parsedContacts = JSON.parse(savedContacts);
      parsedContacts.forEach(contact => dispatch(addContact(contact)));
    }
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <div className={css.maindiv}>
        <h1>Phonebook</h1>
        <AddContacts
          name={name}
          number={number}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
        <Filter handleChange={handleChange} />
        <ContactsList handleDelete={handleDelete} loading={loading} />
      </div>
    </>
  );
}
