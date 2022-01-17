import React, { useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import Item from "../../components/item/Item";
import Pagination from "../../components/pagination/Pagination";
import ExploreFilters from "../Explore/ExploreFilters";
import { useDispatch} from "react-redux";
import { retrieveCollection } from "../../store/CollectionSlice";
import getItems from "../../constants/items";

const listItems = getItems();

const ItemsCollection = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [item,setItem] = useState([]);
  const [page, setPage] = useState(1);


  const fetchCollection = () =>{
    dispatch(retrieveCollection(id))
    .unwrap()
    .then((originalPromiseResult) => {
      console.log(originalPromiseResult);
      setItem(originalPromiseResult.body.data)
    })
    .catch((rejectedValueOrSerializedError) => {
      console.log(rejectedValueOrSerializedError);
    });
  }

  useEffect(() => {
    fetchCollection();
  },[id])

  return (
    <Container>
      <Row className="row--grid">
        <div className="col-12">
          <div className="main__title main__title--page">
            <h1>{item.title}</h1>
          </div>
        </div>
      </Row>

      <Row>
        <Col className="col-12 col-xl-3 order-xl-2">
          <div className="filter-wrap">
            <ExploreFilters />
          </div>
        </Col>

        <Col className="col-12 col-xl-9 order-xl-1">
          <Row>
            {listItems.map((item, index) => (
              <Col key={index} sm="6" lg="4">
                <Item itemId={item._id} item={item} />
              </Col>
            ))}
          </Row>

          <Row className="row row--grid">
            <Col className="col-12">
              <Pagination
                page={page}
                sizePerPage={8}
                totalSize={169}
                onChange={setPage}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemsCollection;
