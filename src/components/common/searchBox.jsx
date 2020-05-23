import React from "react";
const SearchBox = ({ placeholder, value, onChange }) => {
  return (
    <input
      className="form-control mb-3"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};
SearchBox.defaultProps = {
  placeholder: "Search...",
};
export default SearchBox;
