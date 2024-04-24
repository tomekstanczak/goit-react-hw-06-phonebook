import css from './Filter.module.css';
import PropTypes from 'prop-types';

export function Filter({ handleChange }) {
  return (
    <>
      <h2>Find contact</h2>
      <input
        type="text"
        name="filter"
        onChange={handleChange}
        className={css.filter}
      />
    </>
  );
}

Filter.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
