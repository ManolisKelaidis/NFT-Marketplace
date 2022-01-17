import React from "react";
import { isFunction } from "formik";
import { ListGroup, FormCheck } from "react-bootstrap";

const CheckboxGroup = ({
  groupAs,
  groupClass,
  itemIdPrefix,
  values = [],
  options = [],
  onChange,
}) => {
  const isSelected = (itemValue) => {
    return values.includes(itemValue);
  };

  const onToggleItem = (e) => {
    const itemValue = e.target.value;
    const valueArray = [...values];

    if (isSelected(itemValue)) valueArray.splice(valueArray.indexOf(itemValue), 1);
    else valueArray.push(itemValue);

    if (isFunction(onChange)) onChange(valueArray);
  };

  return (
    <ListGroup as={groupAs} className={groupClass}>
      {options.map((item, index) => (
        <FormCheck
          key={index}
          id={`${itemIdPrefix}-checkbox-${index}`}
          className="pl-0 mb-3"
          type="checkbox"
          label={item.label}
          value={item.value}
          checked={isSelected(item.value)}
          onChange={onToggleItem}
        />
      ))}
    </ListGroup>
  );
};

export default CheckboxGroup;
