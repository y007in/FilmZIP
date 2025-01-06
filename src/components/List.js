import React from "react";

const List = ({ data, onClick, renderItem }) => {
  return (
    <ul className="lists">
      {data.map((item, i) => (
        <li className="list" key={item.id} onClick={() => onClick(item)}>
          {renderItem(item, i)}
        </li>
      ))}
    </ul>
  );
};

export default List;
