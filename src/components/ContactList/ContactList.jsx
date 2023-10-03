import css from './ContactList.module.css';
import { Contact } from 'components/Contact/Contact';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul className={css.list}>
      {contacts.map(contact => (
          <Contact
          id={contact.id}
            key={contact.id}
            name={contact.name}
            number={contact.number}
            onDelete={onDelete}
          />
      ))}
    </ul>
  );
};
