import React, { useState } from "react";
import { Collapse, Button } from "react-bootstrap";

import CheckboxGroup from "../../components/checkbox/CheckboxGroup";

const filterList = [
  { value: "listings", label: "Listings" },
  { value: "purchases", label: "Purchases" },
  { value: "sales", label: "Sales" },
  { value: "transfers", label: "Transfers" },
  { value: "bids", label: "Bids" },
  { value: "likes", label: "Likes" },
  { value: "followings", label: "Followings" },
];

const ActivityFilters = () => {
  const [activeFilters, setActiveFilters] = useState(["bids", "likes"]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const clearFilters = () => setActiveFilters([]);

  return (
    <div className="filter-wrap">
      <Button
        className="filter-wrap__btn"
        variant="empty"
        data-toggle="collapse"
        data-target="#collapseFilter"
        aria-controls="collapseFilter"
        aria-expanded="false"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? "Close filters" : "Open filters"}
      </Button>

      <Collapse in={isCollapsed}>
        <div className="filter-wrap__content" id="collapseFilter">
          <div className="filter filter--sticky">
            <h4 className="filter__title">
              Filters{" "}
              <button type="button" onClick={clearFilters}>
                Clear all
              </button>
            </h4>

            <div className="filter__group">
              <CheckboxGroup
                groupAs="ul"
                groupClass="filter__checkboxes"
                itemIdPrefix="filter"
                options={filterList}
                values={activeFilters}
                onChange={setActiveFilters}
              />
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default ActivityFilters;
