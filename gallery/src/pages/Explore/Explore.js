import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Item from "../../components/item/Item";

import InfiniteScroll from "react-infinite-scroll-component";
import ExploreFilters from "./ExploreFilters";
import useError from "../../hooks/useError";
import { retrieveAssets } from "../../store/AssetSlice";

const Explore = () => {
  const { t } = useTranslation();
  const [NftList, setNftList] = useState([]);
  const dispatch = useDispatch();
  const { handleError } = useError();
  const [subArray, setSubArray] = useState([]);
  const [originalItems, setOriginalItems] = useState([]);
  const [itemsPerScroll, setItemsPerScroll] = useState(3);
  const data = { saleType: "PutOnSale" };

  const fetchAssets = async () => {
    try {
      const originalPromiseResult = await dispatch(
        retrieveAssets(data)
      ).unwrap();
      setNftList(originalPromiseResult.body.data);
      setOriginalItems(
        originalPromiseResult.body.data.slice(0, itemsPerScroll)
      );
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
      handleError({ status: rejectedValueOrSerializedError.status });
      
    }
  };
  const fetchMoreData = () => {
    const tmp = itemsPerScroll;

    setItemsPerScroll(itemsPerScroll + 10);

    setSubArray(NftList.slice(0, tmp));
  };

  useEffect(async () => {
    fetchAssets();
  }, []);
  console.log(NftList);
  return (
    <Container>
      <Row className="row--grid">
        <div className="col-12">
          <div className="main__title main__title--page">
            <h1>{t("explore-page.title")}</h1>
          </div>
        </div>
      </Row>

      <Row>
        <Col className="col-12 col-xl-3 order-xl-2">
          <div className="filter-wrap">
            <ExploreFilters
              listItems={NftList}
              subList={subArray}
              setListItems={setNftList}
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
                    <Item itemId={item._id} item={item} />
                  </Col>
                ))}
              </Row>
            </InfiniteScroll>
          ) : (
            <Row>
              {NftList.slice(0, itemsPerScroll).map(
                (item, index) => (
                  (
                    <Col key={index} sm="6" lg="4">
                      <Item itemId={item._id} item={item} />
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

export default Explore;
