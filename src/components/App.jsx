import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';

import { ContactForm } from './ContactForm/ContactForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onSubmit = data => {
    this.setState(prevState => {
      data.id = nanoid();
      return { contacts: [...prevState.contacts, data] };
    });
  };

  nameAlreadyExists = contact => {
    return this.state.contacts.some(({ name }) => name === contact);
  };
  numberAlreadyExists = contact => {
    return this.state.contacts.some(({ number }) => number === contact);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFilter = () => {
    return this.state.contacts.filter(
      contact =>
        contact.name.toLowerCase().match(this.state.filter.toLowerCase()) ||
        contact.number.match(this.state.filter)
    );
  };

  onDelete = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  componentDidMount(){
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'))
    if(parsedContacts){
      this.setState({contacts:parsedContacts})
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.contacts !== prevState.contacts){
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  render() {
    return (
      <div className={css.main}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm
          onSubmit={this.onSubmit}
          nameAlreadyExists={this.nameAlreadyExists}
          numberAlreadyExists={this.numberAlreadyExists}
        />

        <Contacts title="Contacts">
          <Filter filter={this.state.filter} onChange={this.onChange} />
          <ContactList contacts={this.onFilter()} onDelete={this.onDelete} />
        </Contacts>
      </div>
    );
  }
}
