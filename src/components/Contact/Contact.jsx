import css from './Contact.module.css';

export const Contact = ({ id, name, number, onDelete }) => {
  return (
    <li className={css.item}>
      {name}: {number}
      <button
        className={css.btnDelete}
        type="button"
        onClick={() => onDelete(id)}
        title={`Delete ${name}`}
      >
        Delete
      </button>
    </li>
  );
};
