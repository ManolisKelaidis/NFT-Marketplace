import React, { useState } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createBid } from "../../store/BidSlice";

import { retrieveBids } from "../../store/BidSlice";
import {
  retrieveAsset,
  updateAsset,
  retrieveAssets,
} from "../../store/AssetSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { TextInput } from "./../../components/form/FormikFields";
import TabItem from "./TabItem";
import { ModalBasic, ModalFooter } from "../../components/modal";
import getItems from "../../constants/items";
import Item from "../../components/item/Item";
import FormikForm from "./../../components/form/FormikForm";
import Avatar from "./../../assets/img/avatars/face.png";
import image1 from "./../../assets/img/cover/NFT.jpg";
import { ReactComponent as Pencil } from "./../../assets/img/pencil.svg";

import AssetItem from "../../components/AssetItem/AssetItem";
import ItemDescription from "../../components/description/ItemDescription";
import { useNotify } from "../../providers/notify";
const itemDetails = {
  title: "Walking on Air",
  secondtitle: "More from this collection",
  thirdtitle: "Listings",
  price: 1.04,
  img: image1,
  description:
    "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
  owner: "@owner",
  collection: "The Collection",
  history: [
    { bid: 11.0, bidder: "@erik", createdAt: "1-6-2021" },
    { bid: 9.0, bidder: "@john", createdAt: "2-7-2021" },
    { bid: 12.0, bidder: "@nik", createdAt: "5-7-2021" },
    { bid: 5.0, bidder: "@mike", createdAt: "3-7-2021" },
    { bid: 4.0, bidder: "@arthur", createdAt: "2-7-2021" },
  ],
  bids: [
    { bid: 1.0, bidder: "@erik", createdAt: "3-6-2021" },
    { bid: 0.4, bidder: "@john", createdAt: "3-7-2021" },
  ],
  likes: 359,
  createdAt: "2021",
};
const listItems = getItems(5);

const formModel = {
  description: "",
};

const ItemDetails = () => {
  const [BidList, setBidList] = React.useState({ data: [] });
  const [asset, setAsset] = React.useState({ data: [] });
  const { currentUser } = useSelector((state) => state.user);
  const [isEditClicked, setIsEditClicked] = useState(false);

  const {
    params: { assetId },
  } = useRouteMatch("/items/:assetId");
  // console.log(currentUser)
  const dispatch = useDispatch();

  const [bid, setBid] = useState(0);
  const [NftList, setNftList] = useState({ data: [] });
  const [showModal, setShowModal] = useState(false);
  const { showNotification } = useNotify();
  const { t } = useTranslation();
  var sameCollectionList = [];
  const params = { assetId: assetId };
  const filterParams = { saleType: "PutOnSale" };

  const sameCollectionFiltering = () => {
    NftList.data.map((item) => {
      if (item.collectionId === asset.collectionId) {
        sameCollectionList.push(item);
      }
    });
    // sameCollectionList =  sameCollectionList.filter(item => item.id === asset.id)
  };
  const fetchItem = async () => {
    try {
      const originalPromiseResult = await dispatch(
        retrieveAsset(params)
      ).unwrap();

      setAsset(JSON.parse(originalPromiseResult.data).data);
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };

  const fetchBids = async () => {
    try {
      const originalPromiseResult = await dispatch(
        retrieveBids(params)
      ).unwrap();
      setBidList(JSON.parse(originalPromiseResult.data));
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };
  useEffect(async () => {
    fetchItem();
    fetchBids();
    try {
      const originalPromiseResult = await dispatch(
        retrieveAssets(filterParams)
      ).unwrap();
      setNftList(JSON.parse(originalPromiseResult.data));
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  }, [assetId]);
  console.log(NftList.data);
  sameCollectionFiltering();
  const handleSubmit = () => {
    const price = parseInt(bid, 10);

    const data = {
      assetId: assetId,
      bidderId: currentUser._id,
      price: price,
      date: "Today",
    };

    dispatch(createBid(data))
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult);
      })
      .then(() => {
        return fetchBids();
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });

    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleChange = (e) => {
    setBid(e.target.value);
  };

  const onSubmit = (values) => {
    setIsEditClicked(false);
    showNotification({
      type: "success",
      message: "Information Updated",
    });
    console.log(values);
  };
  const onLikeItem = async () => {
    var tempLikes = parseInt(asset.likes);
    tempLikes += 1;

    try {
      const originalPromiseResult = await dispatch(
        updateAsset({
          assetId: asset._id,
          data: { ...asset, likes: tempLikes.toString() },
        })
      ).unwrap();
      setAsset(JSON.parse(originalPromiseResult.data).data);
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  };

  return (
    <Container>
      <div className="main__title main__title--page">
        <h1>{asset.title}</h1>
      </div>

      <Row>
        <AssetItem
          onSomething={onLikeItem}
          itemDetails={asset}
          likes={asset.likes}
        />

        <Col xl="4">
          <div className="asset__info">
            {currentUser._id === asset.ownerId ? (
              <ItemDescription
                outerClassName="asset__desc__verified"
                innerClassName="row align-items-end no-gutters"
                isEditClicked={isEditClicked}
                setIsEditClicked={setIsEditClicked}
                formModel={formModel}
                onSubmit={onSubmit}
                asset={asset}
                t={t}
              ></ItemDescription>
            ) : (
              <div className="asset__desc">
                <h2>{t("item-details-page.description")}</h2>
                <p>{asset.description}</p>
              </div>
            )}

            {!isEditClicked && (
              <ul className="asset__authors">
                <li>
                  <span>{t("item-details-page.creator")}</span>
                  <div className="asset__author asset__author--verified">
                    <img src={Avatar} alt="avatar" />
                    <Link to="author.html">{asset.owner}</Link>
                  </div>
                </li>
                <li>
                  <span>{t("item-details-page.collection")}</span>
                  <div className="asset__author ">
                    <img src={Avatar} alt="avatar" />
                    <Link to="/items">{asset.collection}</Link>
                  </div>
                </li>
              </ul>
            )}

            <TabItem
              historyItems={BidList.data}
              bidItems={BidList.data}
              details={{
                owner: asset.owner,
                createdAt: asset.createdAt,
              }}
            />
            <div className="asset__btns">
              <Button type="button" className="asset__btn asset__btn--clr">
                {t("item-details-page.buy", { price: itemDetails.price })}
              </Button>
              <Button
                type="button"
                className="asset__btn"
                onClick={() => setShowModal(true)}
              >
                {t("item-details-page.bid")}
              </Button>
            </div>
          </div>
        </Col>
        <Container>
          <div className="main__title main__title--page">
            <h1>{itemDetails.secondtitle}</h1>
          </div>

          <section className="row row--grid">
            {sameCollectionList.map((d, index) => (
              <div key={index} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                <Item itemId={d._id} item={d} index={index + 1} />
              </div>
            ))}
          </section>
        </Container>
        <div className="main__title main__title--page">
          <h1>{itemDetails.thirdtitle}</h1>
        </div>

        <section className="row row--grid">
          {listItems.map((d, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <Item itemId={d._id} item={d} />
            </div>
          ))}
        </section>
      </Row>
      <ModalBasic
        title="Title here"
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      >
        <div className="sign__group sign__group--row">
          <label className="sign__label" for="placebid">
            Your bid
          </label>
          <input
            id="placebid"
            type="number"
            name="placebid"
            className="sign__input"
            onChange={handleChange}
          />

          <span className="sign__text sign__text--small">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour.
          </span>
        </div>

        <ModalFooter
          confirmButton="ok"
          cancelButton="cancel"
          onCancel={handleCloseModal}
          onSubmit={handleSubmit}
        ></ModalFooter>
      </ModalBasic>
    </Container>
  );
};

export default ItemDetails;
