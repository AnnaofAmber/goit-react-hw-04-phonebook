import React, { Component } from 'react';

import css from './ContactForm.module.css';
export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit, nameAlreadyExists, numberAlreadyExists } = this.props;

    if (nameAlreadyExists(this.state.name)) {
      alert(`${this.state.name} already exists!`);
      return;
    }
    if (numberAlreadyExists(this.state.number)) {
      alert(`${this.state.number} already exists in Your Contact list`);
      return;
    }

    onSubmit(this.state);
    this.reset();
  };

  render() {
    return (
      <form className={css.contactForm} onSubmit={this.handleSubmit}>
        <label className={css.label} htmlFor="name">
          Name
        </label>
        <input
          className={css.input}
          id="name"
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.onChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label className={css.label} htmlFor="number">
          Number
        </label>
        <input
          className={css.input}
          id="number"
          type="tel"
          name="number"
          value={this.state.number}
          onChange={this.onChange}
          pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button className={css.btnAdd} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
