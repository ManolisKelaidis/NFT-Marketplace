import useQueryParams from "../../hooks/useQueryParams";
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { retrieveAssets } from "../../store/AssetSlice";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import Item from "../../components/item/Item";
import InfiniteScroll from "react-infinite-scroll-component";
const GlobalSearch = () => {
  const dispatch = useDispatch();
  const queryParam = useQueryParams();
  const query = queryParam.get("query");
  const { t } = useTranslation();
  const [subArray, setSubArray] = useState([]);
  const [filteredNft, setFilteredNft] = useState([]);

  const [itemsPerScroll, setItemsPerScroll] = useState(6);
  var tmpArray = [];

  const data = { saleType: "PutOnSale" };
  const filterNFts = (NftList) => {
    NftList.map((nft) => {
      if (
        nft.owner.toLowerCase().includes(query.toLowerCase()) ||
        nft.title.toLowerCase().includes(query.toLowerCase())
      ) {
        tmpArray.push(nft);
      }
    });
    setFilteredNft(tmpArray);
    console.log(tmpArray);
  };

  const fetchMoreData = () => {
    const tmp = itemsPerScroll;

    setItemsPerScroll(itemsPerScroll + tmp);
    console.log(filteredNft);
    setSubArray(filteredNft.slice(0, tmp));
  };
  useEffect(async () => {
    try {
      const originalPromiseResult = await dispatch(
        retrieveAssets(data)
      ).unwrap();

      filterNFts(JSON.parse(originalPromiseResult.data).data);
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  }, []);
  return (
    <Container>
      <Row className="row--grid">
        <div className="col-12">
          <div className="main__title main__title--page">
            <h1>Searched for : {query}</h1>
          </div>
        </div>
      </Row>

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
            {filteredNft.slice(0, itemsPerScroll).map(
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
    </Container>
  );
};

export default GlobalSearch;
