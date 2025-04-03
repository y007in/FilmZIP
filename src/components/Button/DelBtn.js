import React from 'react';

const DelBtn = ({ onClick }) => {
  return (
    <button className="delBtn" onClick={onClick}>
      &chi;
    </button>
  );
};

export default DelBtn;
