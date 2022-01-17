import React, { useState } from "react";

import Search from "../../components/input/Search";

const UserFilters = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    console.log("TBD: search by ", searchText);
  };

  return (
    <div className="main__filter">
      <Search
        wrapperClass="main__filter-search"
        value={searchText}
        placeholder="Search for a creator…"
        onChange={setSearchText}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default UserFilters;
