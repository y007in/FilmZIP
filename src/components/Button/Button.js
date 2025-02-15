const Button = ({ text, styleType, onClick }) => {
  const btnType = ['brand', 'brandSolid', 'full'].includes(styleType)
    ? styleType
    : 'brandSolid';
  return (
    <button className={['btn', `${btnType} `].join(' ')} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
