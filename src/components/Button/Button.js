const Button = ({ text, styleType, styleSize, onClick, form, disabled }) => {
  const btnType = [
    'brand',
    'brandSolid',
    'full',
    'fullSolid',
    'disabled',
  ].includes(styleType)
    ? styleType
    : '';
  const btnSize = ['small', 'large'].includes(styleSize) ? styleSize : 'small';

  return (
    <button
      className={[`btn ${btnSize} ${btnType} `]}
      onClick={onClick}
      form={form}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
