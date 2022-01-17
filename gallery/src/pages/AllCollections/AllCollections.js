import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import InfiniteScroll from "react-infinite-scroll-component";
import CollectionItem from "../../components/collectionItem/CollectionItem";
import Pagination from "../../components/pagination/Pagination";
import ExploreFilters from "../Explore/ExploreFilters";
import useError from "../../hooks/useError";
import { useDispatch } from "react-redux";
import { retrieveCollections } from "../../store/CollectionSlice";

const AllCollections = () => {
  const [listItems, setListItems] = useState([]);
  const [subArray, setSubArray] = useState([]);
  const { handleError } = useError();
  const [originalItems, setOriginalItems] = useState([]);
  const [itemsPerScroll, setItemsPerScroll] = useState(3);
  const dispatch = useDispatch();

  const fetchCollections = () => {
    dispatch(retrieveCollections({ category: "Art" }))
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult);
        setListItems(originalPromiseResult.body.data);
        setOriginalItems(
          originalPromiseResult.body.data.slice(0, itemsPerScroll)
        );
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
        handleError({ status: rejectedValueOrSerializedError.status });
      });
  };

  const fetchMoreData = () => {
    const tmp = itemsPerScroll;

    setItemsPerScroll(itemsPerScroll + 10);

    setSubArray(listItems.slice(0, tmp));
  };
  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <Container>
      <Row className="row--grid">
        <div className="col-12">
          <div className="main__title main__title--page">
            <h1>Explore exclusive collections</h1>
          </div>
        </div>
      </Row>

      <Row>
        <Col className="col-12 col-xl-3 order-xl-2">
          <div className="filter-wrap">
            <ExploreFilters
              listItems={listItems}
              setListItems={setListItems}
              subList={subArray}
              setSubList={setSubArray}
              originalItems={originalItems}
            />
          </div>
        </Col>

        <Col className="col-12 col-xl-9 order-xl-1">
          {subArray.length ? (
            <InfiniteScroll
              dataLength={itemsPerScroll}
              next={fetchMoreData}
              hasMore={true}
              style={{ overflowX: "hidden" }}
            >
              <Row>
                {subArray.map((item, index) => (
                  <Col key={index} sm="6" lg="4">
                    <CollectionItem itemId={item._id} item={item} />
                  </Col>
                ))}
              </Row>
            </InfiniteScroll>
          ) : (
            <Row>
              {listItems.slice(0, itemsPerScroll).map(
                (item, index) => (
                  (
                    <Col key={index} sm="6" lg="4">
                      <CollectionItem itemId={item._id} item={item} />
                    </Col>
                  ),
                  fetchMoreData()
                )
              )}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AllCollections;
