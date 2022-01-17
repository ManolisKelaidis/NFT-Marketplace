import React from "react";
import {useParams} from 'react-router'
import { Row, Col } from "react-bootstrap";

import { useDispatch } from "react-redux";
import Item from "../../components/item/Item";
import { useEffect } from "react";
import getItems from "../../constants/items";
import { retrieveAssets } from "../../store/AssetSlice";

const listItems = getItems(3);

const WalletList = () => {
  const dispatch = useDispatch();
  const {id} = useParams();
  console.log(id)
  const [assetList, setAssetList] = React.useState({ data: [] });

  useEffect(async () => {
    try {
      const originalPromiseResult = await dispatch(
        retrieveAssets({ saleType: "PutOnSale" })
      ).unwrap();
      setAssetList(JSON.parse(originalPromiseResult.data));
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  }, []);

  return (
    <Row className="row--grid">
      {assetList.data.map((data, jIndex) => (
        <Col key={jIndex} className="col-12 col-sm-6 col-lg-4">
          <Item itemId={data._id} item={data} />
        </Col>
      ))}
    </Row>
  );
};


export default WalletList;
