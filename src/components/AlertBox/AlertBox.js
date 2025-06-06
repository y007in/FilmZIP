import React, { useState } from 'react';
import Button from '../Button/Button';

const AlertBox = ({ alertText, onSubmit, submitText, onCancel }) => {
  return (
    <div className="alertOverlay">
      <div className={'alertBox'}>
        <p className="alertTxt">{alertText}</p>
        <div className="selectBtn">
          <Button text={'취소'} onClick={onCancel} />
          <Button text={submitText} styleType={'brand'} onClick={onSubmit} />
        </div>
      </div>{' '}
    </div>
  );
};

export default AlertBox;
