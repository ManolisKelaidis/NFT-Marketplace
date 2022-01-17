import { Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import HistoryItem from "./HistoryItem";

import Avatar from "./../../assets/img/avatars/avatar.jpg";

import "./Details.scss";

const TabItem = ({ historyItems, bidItems, details }) => {
  const { t } = useTranslation();

  return (
    <Tabs
      className="asset__tabs"
      defaultActiveKey="history"
      id="details-page-tabs"
    >
      <Tab eventKey="history" title={t("item-details-page.tabs.history")}>
        <div className="asset__actions asset__actions--scroll">
          {historyItems.map((item, index) => {
            return <HistoryItem item={item} key={index} />;
          })}
        </div>
      </Tab>
      <Tab eventKey="bid" title={t("item-details-page.tabs.bid")}>
        <div className="asset__actions asset__actions--scroll">
          {bidItems.map((item, index) => {
            return <HistoryItem item={item} key={index} />;
          })}
        </div>
      </Tab>
      <Tab eventKey="details" title={t("item-details-page.tabs.details")}>
        <ul className="asset__authors asset__authors--tab">
          <li>
            <span>{t("item-details-page.owner")}</span>
            <div className="asset__author asset__author--verified">
              <img src={Avatar} alt="avatar" />
              <Link to="/author">{details.owner}</Link>
            </div>
          </li>
          <li>
            <span>{t("item-details-page.year-created")}</span>
            <p>{details.createdAt}</p>
          </li>
        </ul>
      </Tab>
    </Tabs>
  );
};

export default TabItem;
