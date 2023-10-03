import css from './Filter.module.css';

export const Filter = ({ filter, onChange }) => {
  return (
    <div className={css.filter}>
      <label className={css.label} htmlFor="search">
        Find contacts by name:
      </label>
      <input
        className={css.input}
        id="search"
        name="filter"
        value={filter}
        type="text"
        onChange={onChange}
      />
    </div>

  );
};
