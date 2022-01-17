import React from "react";
import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";
import { Button } from "react-bootstrap";
const PaginateItems = ({ itemsPerPage, totalItems ,paginate}) => {
  const pageNumbers = [];
  console.log(itemsPerPage, totalItems);

  for (let i = 1; i < Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers);
  pageNumbers.map((number) => {
    console.log(number);
  });
  return (
    <Pagination size="lg" className="paginator">
      {pageNumbers.map((number, index) => (
        <PageItem className="paginator__list" key={index} onClick= {() => paginate(number)} >{number}</PageItem>
      ))}
    </Pagination>
  );
};

export default PaginateItems;
