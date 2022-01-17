import { Link } from "react-router-dom";
import { Trans } from "react-i18next";
import { useEffect, useState } from "react";
import { retrieveUser } from "../../store/UserSlice";
import { useDispatch } from "react-redux";
import Avatar from "./../../assets/img/avatars/avatar.jpg";

const ActionItem = ({ item }) => {
  const dispatch = useDispatch();
  const [user,setUser]=useState({});
  
  const fetchUser = () => {
    dispatch(retrieveUser(item.bidderId))
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult);
        setUser(originalPromiseResult.body.data);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };
  useEffect(async () => {
    fetchUser();
    
  }, []);
  return (
    <div className="asset__action asset__action--verified">
      <img src={Avatar} alt="avatar" />
      <p>
        <Trans
          i18nKey="item-details-page.history-item"
          values={{ bid: item.price, created: item.date }}
          components={{ bold: <strong />, break: <br /> }}
        />{" "}
        <Link to="author">{user.username}</Link>
      </p>
    </div>
  );
};

export default ActionItem;
