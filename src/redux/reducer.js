import { createReducer } from '@reduxjs/toolkit';
import { addContact, deleteContact, filtering } from './actions';

const contactsInitialState = [];

const filterInitialState = '';

export const contactsReducer = createReducer(contactsInitialState, builder => {
  builder
    .addCase(addContact, (state, action) => {
      return [...state, action.payload];
    })
    .addCase(deleteContact, (state, action) => {
      return state.filter(contact => contact.id !== action.payload);
    });
});

export const filterReducer = createReducer(filterInitialState, builder => {
  builder.addCase(filtering, (state, action) => {
    return action.payload;
  });
});
