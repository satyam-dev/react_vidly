import React from "react";
const Input = ({ value, label, name, onChange, type, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        className="form-control"
        value={value}
        name={name}
        type={type}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </div>
  );
};

export default Input;
