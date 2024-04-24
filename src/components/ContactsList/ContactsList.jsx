import React from 'react';
import css from './ContactsList.module.css';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export function ContactsList({ handleDelete, loading }) {
  const contacts = useSelector(state => state.contacts);
  const filtered = useSelector(state => state.filtered);

  const handleFilter = () => {
    let result;
    if (filtered === '') {
      result = contacts;
    } else {
      result = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filtered.toLowerCase())
      );
    }
    console.log(result);
    return result;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const results = handleFilter();
  return (
    <>
      <h3>Contacts</h3>
      <ul>
        {results.map(contact => (
          <li key={contact.id} className={css.listStyle}>
            {contact.name}: {contact.number}
            <button type="button" onClick={() => handleDelete(contact.id)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

ContactsList.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
