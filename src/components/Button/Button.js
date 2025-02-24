const Button = ({ text, styleType, styleSize, onClick }) => {
  const btnType = ['brand', 'brandSolid', 'full'].includes(styleType)
    ? styleType
    : 'brandSolid';
  const btnSize = ['small', 'large'].includes(styleSize) ? styleSize : 'small';

  return (
    <button className={[`btn ${btnType} ${btnSize}`]} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
