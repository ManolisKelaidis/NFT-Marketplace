import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Collapse, Button } from "react-bootstrap";

import CheckboxGroup from "../../components/checkbox/CheckboxGroup";
import DropdownBasic from "../../components/dropdown/DropdownBasic";
import useQueryParams from "../../hooks/useQueryParams";
const filterList = [
  { value: "Art", label: "Art" },
  { value: "Photography", label: "Photography" },
  { value: "Games", label: "Games" },
  { value: "Metaverses", label: "Metaverses" },
  { value: "Music", label: "Music" },
  { value: "Domains", label: "Domains" },
  { value: "Memes", label: "Memes" },
];

const filterItems = [
  { name: "Name", value: "name" },
  { name: "Price", value: "price" },
  { name: "Created Date", value: "createdAt" },
];

const ExploreFilters = ({
  listItems,
  setListItems,
  originalItems,
  subList,
  setSubList,
}) => {
  const { t } = useTranslation();
  const queryParam = useQueryParams();
  const query = queryParam.get("query");
  console.log(query);
  const [activeFilters, setActiveFilters] = useState([query]);
  const [sortFilter, setSortFilter] = useState("name");
  const [search, setSearch] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  var filteredlist = [];
  var tmpFilteredList = [];

  console.log(listItems);
  console.log(originalItems);
  console.log(subList);
 

  const clearFilters = () => {
    console.log(originalItems);
    setSubList(originalItems);
    setActiveFilters([]);
  };
  const handleSearch = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const handleSort = (e) => {
    console.log(e.target.value);
    setSortFilter(e.target.value);
  };

  const applyFilters = () => {
    if (search) {
      listItems.map((item) => {
        // console.log(item.category);
        if (
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.owner.toLowerCase().includes(search.toLowerCase())
        ) {
          if (activeFilters.length) {
            tmpFilteredList.push(item);
          } else {
            filteredlist.push(item);
          }
        }
      });
    }

    if (activeFilters.length) {
      console.log("Im never in her");
      if (search) {
        for (let index = 0; index < activeFilters.length; index++) {
          tmpFilteredList.map((item) => {
            console.log(item.category);
            if (item.category === activeFilters[index]) {
              filteredlist.push(item);
            }
          });
        }
      } else {
        for (let index = 0; index < activeFilters.length; index++) {
          originalItems.map((item) => {
            console.log(item.category);
            if (item.category === activeFilters[index]) {
              filteredlist.push(item);
            }
          });
        }
      }
    }
    console.log(filteredlist);
    setSubList(filteredlist);

    console.log(filteredlist);

    console.log(activeFilters);
    console.log(sortFilter);
    console.log(search);
  };
  
  return (
    <>
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
              {t("filters")}{" "}
              <button type="button" onClick={clearFilters}>
                {t("clear-all")}
              </button>
            </h4>

            <div className="filter__group">
              <label className="filter__label">
                {t("explore-page.keyword")}
              </label>
              <input
                type="text"
                className="filter__input"
                placeholder="Keyword"
                onChange={handleSearch}
              />
            </div>

            <div className="filter__group">
              <label className="filter__label">
                {t("explore-page.sort-by")}
              </label>

              <div className="filter__select-wrap">
                <DropdownBasic
                  type="filter"
                  title="testing"
                  items={filterItems}
                  onChange={handleSort}
                />
              </div>
            </div>

            <div className="filter__group">
              <label className="filter__label">
                {t("explore-page.category")}
              </label>
              <CheckboxGroup
                groupAs="ul"
                groupClass="filter__checkboxes"
                itemIdPrefix="filter"
                options={filterList}
                values={activeFilters}
                onChange={setActiveFilters}
              />
            </div>

            <div className="filter__group">
              <Button
                className="filter__btn"
                type="button"
                onClick={applyFilters}
              >
                {t("apply-filters")}
              </Button>
            </div>
          </div>
        </div>
      </Collapse>
    </>
  );
};

export default ExploreFilters;
