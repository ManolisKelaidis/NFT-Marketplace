import React from "react";
import { FormControl, Button } from "react-bootstrap";

import { ReactComponent as SearchIcon } from "../../assets/img/icons/search.svg";

const Search = ({ wrapperClass, value, onChange, onSearch, ...rest }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const onKeyDown = (e) => {
    // on 'ENTER'
    if (e.keyCode === 13) {
      onSearch();
    }
  };

  return (
    <div className={wrapperClass}>
      <FormControl
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={onKeyDown}
        {...rest}
      />
      <Button variant="empty" onClick={onSearch}>
        <SearchIcon />
      </Button>
    </div>
  );
};

export default Search;
