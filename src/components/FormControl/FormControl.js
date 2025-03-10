import React from 'react';

const FormControl = ({ label, htmlFor, sr_only, children, errors }) => {
  return (
    <div className="FormControl">
      <label htmlFor={htmlFor} className={sr_only}>
        {label}
      </label>
      <div className="inputBox">
        {children}
        {errors && <span className="error">{errors}</span>}
      </div>
    </div>
  );
};

export default FormControl;
