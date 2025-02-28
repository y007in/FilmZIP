import React from 'react';

const PopUp = ({ children }) => {
  return (
    <div className="popUp">
      <section>{children}</section>
    </div>
  );
};

export default PopUp;
