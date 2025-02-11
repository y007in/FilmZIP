const Button = ({ text, type, onClick }) => {
  const btnType = ['brand', 'brandSolid'].includes(type) ? type : 'brandSolid';
  return (
    <button className={['btn', `${btnType} `].join(' ')} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
