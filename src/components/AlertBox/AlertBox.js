import React from 'react';
import Button from '../Button/Button';

const AlertBox = ({ alertText, onSubmit, submitText, onCancel }) => {
  return (
    <div className="overlay">
      <div className={'alertBox'}>
        <p className="alertTxt">{alertText}</p>
        <div className="selectBtn">
          {onCancel && <Button text={'취소'} onClick={onCancel} />}
          <Button text={submitText} styleType={'brand'} onClick={onSubmit} />
        </div>
      </div>{' '}
    </div>
  );
};

export default AlertBox;
