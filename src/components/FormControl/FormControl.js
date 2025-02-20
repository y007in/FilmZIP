import React from 'react';

const FormControl = ({ label, htmlFor, sr_only, required, children }) => {
  return (
    <div className="FormControl">
      <label htmlFor={htmlFor} className={sr_only}>
        {label}
        {required && <span className="required">*</span>}
      </label>
      {children}
    </div>
  );
};

export default FormControl;
