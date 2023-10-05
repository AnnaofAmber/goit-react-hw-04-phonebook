import {useState } from 'react';

import css from './ContactForm.module.css';


export const ContactForm =({onSubmit, nameAlreadyExists})=>  {

  const [name, setName] = useState("")
  const [number, setNumber] = useState("")


  const reset = () => {
    setName("")
    setNumber("")
  };

 const handleSubmit = e => {
    e.preventDefault();
    if (nameAlreadyExists(name)) {
      alert(`${name} already exists!`);
      return;
    }
    onSubmit({name, number})
    reset();

 }
    return (
      <form className={css.contactForm} onSubmit={handleSubmit}>
        <label className={css.label} htmlFor="name">
          Name
        </label>
        <input
          className={css.input}
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={e=> setName(e.target.value)}
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
          value={number}
          onChange={e=> setNumber(e.target.value)}
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

