export function Filter({ handleChange }) {
  return (
    <>
      <h2>Find contact</h2>
      <input type="text" name="filter" onChange={handleChange} />
    </>
  );
}
