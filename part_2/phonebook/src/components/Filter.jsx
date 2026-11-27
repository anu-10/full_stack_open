const Filter = ({ filterStr, handleChangeFilter }) => (
  <label className="field">
    <span className="field-label">Search contacts</span>
    <input type="search" value={filterStr} onChange={handleChangeFilter} placeholder="Type a name…" />
  </label>
);

export default Filter;
