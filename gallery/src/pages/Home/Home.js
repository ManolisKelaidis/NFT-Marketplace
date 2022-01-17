import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Container } from "react-bootstrap";

import Pagination from "../../components/pagination/Pagination";
import Item from "../../components/item/Item";
import HomeHeader from "./HomeHeader";

import { retrieveAssets } from "../../store/AssetSlice";
import useError from "../../hooks/useError";
const sortAssets = (assets) => {
  var onSaleAssets = [];
  assets.data.map((item) => {
    if (item.saleType === "PutOnSale") {
      onSaleAssets.push(item);
    }
  });

  return onSaleAssets;
};
const filterParams = { saleType: "PutOnSale" };

const Home = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { handleError } = useError();
  const [NftList, setNftList] = useState({ data: [] });

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  useEffect(async () => {
    try {
      const originalPromiseResult = await dispatch(
        retrieveAssets(filterParams)
      ).unwrap();
      setNftList(JSON.parse(originalPromiseResult.data));
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
      handleError({ status: rejectedValueOrSerializedError.status });
    }
  }, []);
  const assets = sortAssets(NftList);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = assets.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <React.Fragment>
      <HomeHeader />

      <Container>
        <section className="row row--grid">
          <div className="col-12">
            <h2 className="text-white">{t("auth-home-page.title")}</h2>
            <div className="main__title main__title--center">
              <h2>Explore exclusive digital assets</h2>
            </div>
          </div>

          {currentPosts.map((d, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-4 col-xl-3">
              <Item itemId={d._id} item={d} />
            </div>
          ))}
          <Pagination
            sizePerPage={postsPerPage}
            totalSize={assets.length}
            page={currentPage}
            onChange={paginate}
          ></Pagination>
        </section>
      </Container>
    </React.Fragment>
  );
};

export default Home;
