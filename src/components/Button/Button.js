const Button = ({
  text,
  icon,
  styleType,
  styleSize,
  onClick,
  form,
  disabled,
  active,
}) => {
  const btnType = [
    'brand',
    'brandSolid',
    'full',
    'fullSolid',
    'disabled',
    'square',
    'stat STOPPED',
    'stat REWATCHED',
    'stat FINISHED',
  ].includes(styleType)
    ? styleType
    : '';
  const btnSize = ['small', 'large'].includes(styleSize) ? styleSize : '';

  return (
    <button
      className={[`btn ${btnSize} ${btnType} ${active ? 'active' : ''}`]}
      onClick={onClick}
      form={form}
      disabled={disabled}
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

export default Button;
