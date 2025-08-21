const FormControl = ({ label, htmlFor, inputType, sr_only, children }) => {
  return (
    <div className="FormControl">
      <label htmlFor={htmlFor} className={sr_only}>
        {label}
        <span className="limit">
          {(inputType === 'buttonsCheck' ||
            inputType === 'buttonsCheckGroup') &&
            '중복 선택 가능'}
        </span>
      </label>
      <div className="inputBox">{children}</div>
    </div>
  );
};

export default FormControl;
