import React from "react";
import { useTranslation } from "react-i18next";

import FooterLinkItem from "./FooterLinkItem";

import {
  nftMarketplaceList,
  exploreList,
  communityList,
} from "../../constants/footerLinkItems";

const FooterLinkList = () => {
  const { t } = useTranslation();
  console.log(exploreList )
  return (
    <React.Fragment>
      <div className="col-6 col-md-4 col-lg-3 col-xl-2 order-1 order-md-2 order-lg-1 order-xl-2 offset-md-2 offset-lg-0">
        <h6 className="footer__title">{t("menu.nft-marketplace")}</h6>
        <div className="footer__nav">
          {nftMarketplaceList.map((item, index) => (
            <FooterLinkItem key={index} link={item} />
          ))}
        </div>
      </div>

      <div className="col-12 col-md-8 col-lg-6 col-xl-4 order-3 order-lg-2 order-md-3 order-xl-3">
        <div className="row">
          <div className="col-12">
            <h6 className="footer__title">{t("menu.explore")}</h6>
          </div>

          {exploreList.map((group, iIndex) => (
            <div key={iIndex} className="col-6">
              <div className="footer__nav">
                {group.map((item, jIndex) => (
                  <FooterLinkItem key={jIndex} link={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-6 col-md-4 col-lg-3 col-xl-2 order-2 order-lg-3 order-md-4 order-xl-4">
        <h6 className="footer__title">{t("menu.community")}</h6>
        <div className="footer__nav">
          {communityList.map((item, index) => (
            <FooterLinkItem key={index} link={item} />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default FooterLinkList;
