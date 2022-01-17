import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import { retrieveCollections } from "../../store/CollectionSlice";

import CollectionItem from "../../components/collectionItem/CollectionItem";
const CollectionList = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [collectionList, setCollectionList] = React.useState({ data: [] });

  useEffect(async () => {
    try {
      const originalPromiseResult = await dispatch(
        retrieveCollections({ category: "Music" })
      ).unwrap();
      setCollectionList(JSON.parse(originalPromiseResult.data));
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  }, []);

  return (
    <Row className="row--grid">
      {collectionList.data.map((data, jIndex) => (
        <Col key={jIndex} className="col-12 col-sm-6 col-lg-4">
          <CollectionItem itemId={data._id} item={data} />
        </Col>
      ))}
    </Row>
  );
};

export default CollectionList;
