import { useState } from 'react';

import { nanoid } from 'nanoid';
import css from './App.module.css';

import { ContactForm } from './ContactForm/ContactForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  // state = {
  //   contacts: [
  // { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  // { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  // { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  // { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };
  const [contacts, setContacts] = useState([
    { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
    { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
    { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
    { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');
  
  const onSubmit = data => {
    setContacts(prevState => {
      data.id = nanoid();
      return { contacts: [...prevState.contacts, data] };
    });
  };

  const nameAlreadyExists = contact => {
    return contacts.some(({ name }) => name === contact);
  };
  const numberAlreadyExists = contact => {
    return contacts.some(({ number }) => number === contact);
  };

  // const onChange = e => {
  //   this.setState({ [e.target.name]: e.target.value });
  // };

  const onFilter = () => {
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const onDelete = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  // componentDidMount(){
  //   const parsedContacts = JSON.parse(localStorage.getItem('contacts'))
  //   if(parsedContacts){
  //     this.setState({contacts:parsedContacts})
  //   }
  // }

  // componentDidUpdate(prevProps, prevState){
  //   if(this.state.contacts !== prevState.contacts){
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
  //   }
  // }

  return (
    <div className={css.main}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm
        onSubmit={onSubmit}
        nameAlreadyExists={nameAlreadyExists}
        numberAlreadyExists={numberAlreadyExists}
      />

      <Contacts title="Contacts">
        <Filter filter={filter} onChange={setFilter} />
        <ContactList contacts={onFilter()} onDelete={onDelete} />
      </Contacts>
    </div>
  );
};
