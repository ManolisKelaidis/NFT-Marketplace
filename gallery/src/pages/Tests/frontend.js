import React from "react";
import Button from "react-bootstrap/Button";

import { useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import { retrieveAsset } from "../../store/AssetSlice";
import { updateAsset } from "../../store/AssetSlice";
import { deleteAsset } from "../../store/AssetSlice";
import { deleteBid } from "../../store/BidSlice";
import { updateBid } from "../../store/BidSlice";
import { useParams } from "react-router";
import useQueryParams from "../../hooks/useQueryParams";
const Test = () => {
  const dispatch = useDispatch();
  const history = useParams();
  console.log(history);
  const x = useQueryParams();

  console.log(x.get("query"));
  function deleteBIdId(e) {
    dispatch(deleteBid({ bidId: "60f949e1a73bf65b7cb6aeb1" }))
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  }

  function updateBIdId(e) {
    dispatch(
      updateBid({
        bidId: "60f95d5ba73bf65b7cb6aeb9",
        data: {
          assetId: "12345678",
          bidderId: "Updated",
          price: 90,
          date: "Updated",
        },
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  }
  function deleteID(e) {
    dispatch(deleteAsset({ assetId: "60f80ca8c8ae753fe0e036d8" }))
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  }
  function putID(e) {
    dispatch(
      updateAsset({
        assetId: "60f82144c8ae753fe0e036da",
        data: {
          title: "Updated",
          description: "Updated",
          owner: "Updated",
          saleType: "PutOnSale",
        },
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  }
  function getID(e) {
    dispatch(retrieveAsset({ assetId: "60f8229dc8ae753fe0e036dc" }))
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  }

  return (
    <Container>
      <Button onClick={getID}>GetT Asset By ID</Button>
      <Button onClick={putID}>UpdateBYID</Button>
      <Button onClick={deleteID}>deleteID</Button>

      <Button onClick={deleteBIdId}>Delete bid</Button>
      <Button onClick={updateBIdId}>Update bid</Button>
    </Container>
  );
};

export default Test;
