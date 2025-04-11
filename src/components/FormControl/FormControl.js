import React from 'react';

const FormControl = ({ label, htmlFor, sr_only, children }) => {
  return (
    <div className="FormControl">
      <label htmlFor={htmlFor} className={sr_only}>
        {label}
      </label>
      <div className="inputBox">{children}</div>
    </div>
  );
};

export default FormControl;
