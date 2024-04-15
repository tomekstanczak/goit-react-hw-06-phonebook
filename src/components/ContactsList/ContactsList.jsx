import React from 'react';
import css from './ContactsList.module.css';

export function ContactsList({ results, handleDelete }) {
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
