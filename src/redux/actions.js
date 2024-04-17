import { createAction, nanoid } from '@reduxjs/toolkit';

export const addContact = createAction('contacts/addContacts', newContact => {
  return {
    payload: {
      id: nanoid(),
      name: newContact.name,
      number: newContact.number,
    },
  };
});
export const deleteContact = createAction('contacts/deleteContacts');
export const filtering = createAction('filtering/setFiltering');
