import React from 'react';

const BasicList = ({ data, onClick, renderItem }) => {
  return (
    <ul className="BasicList">
      {data.map((item, i) => (
        <li className="listItem" key={item.id} onClick={() => onClick(item)}>
          {renderItem(item, i)}
        </li>
      ))}
    </ul>
  );
};

export default BasicList;
