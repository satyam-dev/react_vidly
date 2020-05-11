import React from "react";
const ListGroup = (props) => {
  const { items, onItemSelect, showBy, identifyBy, selectedItem } = props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[identifyBy]}
          onClick={() => onItemSelect(item)}
          className={
            selectedItem === item
              ? "list-group-item active-link active"
              : "list-group-item active-link"
          }
        >
          {item[showBy]}
        </li>
      ))}
    </ul>
  );
};
ListGroup.defaultProps = {
  showBy: "name",
  identifyBy: "_id",
};

export default ListGroup;
