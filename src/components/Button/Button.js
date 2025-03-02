const Button = ({ text, styleType, styleSize, onClick, form }) => {
  const btnType = ['brand', 'brandSolid', 'full'].includes(styleType)
    ? styleType
    : 'brandSolid';
  const btnSize = ['small', 'large'].includes(styleSize) ? styleSize : 'small';

  return (
    <button
      className={[`btn ${btnType} ${btnSize}`]}
      onClick={onClick}
      form={form}
    >
      {text}
    </button>
  );
};

export default Button;
