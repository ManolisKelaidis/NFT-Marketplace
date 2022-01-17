import React, { useMemo } from "react";
import { Button } from "react-bootstrap";

import { ReactComponent as LeftArrowIcon } from "../../assets/img/icons/left-arrow.svg";
import { ReactComponent as RightArrowIcon } from "../../assets/img/icons/right-arrow.svg";

const fillArray = (start, length) =>
  Array.from({ length }, (d, i) => i + start);

const Pagination = ({ page, sizePerPage, totalSize, onChange }) => {
  const totalPages = useMemo(() => {
    return totalSize > 0 ? Math.ceil(totalSize / sizePerPage) : 0;
  }, [sizePerPage, totalSize]);

  const pageItems = useMemo(() => {
    /* If there are no pages, return an empty array */
    if (totalPages === 0) return [];
    /* If the total number of pages is less than or equal to 7,
     * return an array with values 1, ..., 'totalPages'
     */
    if (totalPages <= 7) return fillArray(1, totalPages);

    const MAX_ITEMS = 3;
    let items = [1];

    if (page <= MAX_ITEMS + 1) {
      /* If active page is at the begining */
      items = [...items, ...fillArray(2, MAX_ITEMS + 1)];
      items.push(-1);
      items.push(totalPages);
    } else if (page >= totalPages - MAX_ITEMS) {
      /* If active page is at the end */
      items.push(-1);
      items = [
        ...items,
        ...fillArray(totalPages - MAX_ITEMS - 1, MAX_ITEMS + 1),
      ];
      items.push(totalPages);
    } else {
      /* If active page is in the range between 
      *  ( MAX_ITEMS + 1, totalPages - MAX_ITEMS )
      */
      items.push(-1);
      items = [...items, ...fillArray(page - 1, MAX_ITEMS)];
      items.push(-1);
      items.push(totalPages);
    }

    return items;
  }, [page, totalPages]);

  const resultText = useMemo(() => {
    if (totalPages === 0) return "Total: 0";

    const start = page * sizePerPage - sizePerPage + 1;
    const end = page === totalPages ? totalSize : page * sizePerPage;
    return `${start} to ${end} of ${totalSize}`;
  }, [page, sizePerPage, totalSize, totalPages]);

  return (
    <div className="paginator">
      <span className="paginator__pages">{resultText} </span>

      {totalPages && (
        <ul className="paginator__list">
          {page !== 1 && (
            <li>
              <Button as="a" variant="empty" onClick={() => onChange(page - 1)}>
                <LeftArrowIcon />
              </Button>
            </li>
          )}

          {pageItems.map((pageItem, index) => (
            <li key={index} className={pageItem === page ? "active" : ""}>
              {pageItem === -1 ? (
                <span className="text-white">...</span>
              ) : (
                <Button
                  as="a"
                  variant="empty"
                  onClick={() => onChange(pageItem)}
                >
                  {pageItem}
                </Button>
              )}
            </li>
          ))}

          {page !== totalPages && (
            <li>
              <Button as="a" variant="empty" onClick={() => onChange(page + 1)}>
                <RightArrowIcon />
              </Button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Pagination;
