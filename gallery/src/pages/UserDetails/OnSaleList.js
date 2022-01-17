import React from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useEffect } from "react";
import { retrieveAssets } from "../../store/AssetSlice";
import Item from "../../components/item/Item";

const sortAssets = (assets, id) => {
  var ownersAssets = [];
  assets.data.map((item) => {
    console.log(id, item.ownerId);
    if (item.ownerId === id) {
      if(item.saleType === "PutOnSale")ownersAssets.push(item);
    }
  });
  console.log(ownersAssets);
  return ownersAssets;
};
const OnSaleList = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
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

  const assets = sortAssets(assetList, id);

  return (
    <Row className="row--grid">
      {assets.map((data, jIndex) => (
        <Col key={jIndex} className="col-12 col-sm-6 col-lg-4">
          <Item itemId={data._id} item={data} />
        </Col>
      ))}
    </Row>
  );
};

export default OnSaleList;
