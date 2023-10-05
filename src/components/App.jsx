import { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';
import css from './App.module.css';

import { ContactForm } from './ContactForm/ContactForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export const App = () => {

  const [contacts, setContacts] = useState(()=>{
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'))
      if(parsedContacts){
        return parsedContacts
      } else
    return[
    { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
    { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
    { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
    { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
  ]});
  const [filter, setFilter] = useState('');
  
  const onSubmit = data => {
    setContacts(prevState => {
      data.id = nanoid();
      return [...prevState, data] ;
    });
  };

  const nameAlreadyExists = contact => {
    return contacts.some(({ name }) => name === contact);
  };

  const onFilter = () => {
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const onDelete = contactId => {
    setContacts(prevState => {
      return prevState.filter(
          contact => contact.id !== contactId
        )
    });
  };

useEffect(()=>{
 localStorage.setItem('contacts', JSON.stringify(contacts))
}, [contacts])

  return (
    <div className={css.main}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm
        onSubmit={onSubmit}
        nameAlreadyExists={nameAlreadyExists}
      />

      <Contacts title="Contacts">
        <Filter filter={filter} onChange={setFilter} />
        <ContactList contacts={onFilter()} onDelete={onDelete} />
      </Contacts>
    </div>
  );
};
