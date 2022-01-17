import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { retrieveUser } from "../../store/UserSlice";
import { LOGOUT_USER } from "../../store/AuthSlice";

// import avatarImg1 from "../../assets/img/avatars/avatar.jpg";
import avatarImg2 from "../../assets/img/avatars/alert-icon.png";
import { ReactComponent as DownArrow } from "../../assets/img/icons/down-arrow.svg";
import { ReactComponent as Profile } from "../../assets/img/icons/profile.svg";
import { ReactComponent as List } from "../../assets/img/icons/list.svg";
import { ReactComponent as AddNew } from "../../assets/img/icons/add-new.svg";
import { ReactComponent as Settings } from "../../assets/img/icons/settings.svg";
import { ReactComponent as SignOut } from "../../assets/img/icons/sign-out.svg";
import { ReactComponent as AddNewCertification } from "../../assets/img/icons/certifications.svg";


const authUser = {
  avatar: "",
  name: "",
  wallet: "",
};

const DropdownNav = (/* { authUser } */) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userId, isSetUp } = useSelector((state) => state.auth);
  const [user, Setuser] = React.useState({ data: [] });

  const authUserId = userId;

  if (!isSetUp) {
    authUser.avatar = avatarImg2;
  }

  const logout = () => {
    dispatch(LOGOUT_USER());
  };

  useEffect(async () => {
    try {
      const originalPromiseResult = await dispatch(
        retrieveUser(userId)
      ).unwrap();
      Setuser(originalPromiseResult.body.data);
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
    }
  }, []);

  return (
    <Dropdown
      className="header__action header__action--profile cursor-pointer"
      bsPrefix="c__none"
    >
      <Dropdown.Toggle
        id={"dropdown-nav-profile"}
        className={
          isSetUp
            ? "header__profile-btn header__profile-btn--verified"
            : "header__profile-btn "
        }
        as="a"
        bsPrefix="c__none"
      >
        <img src={authUser.avatar} alt="avatar" />
        <div>
          <p>{user.username}</p>
          <span>{user.totalEtherium?user.totalEtherium:0} ETH</span>
        </div>
        <DownArrow />
      </Dropdown.Toggle>
      <Dropdown.Menu className="header__profile-menu" as="ul">
        <Dropdown.Item key="profile" as="li" bsPrefix="c__none">
          <Link to={`/user-details/${authUserId}`}>
            <Profile />
            <span>{t("menu.profile")}</span>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item key="activity" as="li" bsPrefix="c__none">
          <Link to={`/user-details/${authUserId}`}>
            <List />
            <span>{t("menu.activity")}</span>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item key="certification" as="li" bsPrefix="c__none">
          <Link to={`/new-certification`}>
            <AddNewCertification />
            <span>{t("menu.add-certification")}</span>
          </Link>
        </Dropdown.Item>



        <Dropdown.Item key="asset" as="li" bsPrefix="c__none">
          <Link to="/new-item">
            <AddNew />
            <span>{t("menu.add-asset")}</span>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item key="collection" as="li" bsPrefix="c__none">
          <Link to="/new-collection">
            <AddNew />
            <span>{t("menu.add-collection")}</span>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item key="settings" as="li" bsPrefix="c__none">
          <Link to={`/user-details/${authUserId}`}>
            <Settings />
            <span>{t("menu.settings")}</span>
          </Link>
        </Dropdown.Item>
        <Dropdown.Item key="logout" as="li" bsPrefix="c__none">
          <Button as="a" bsPrefix="c__none" onClick={logout}>
            <SignOut />
            <span>{t("sign-out")}</span>
          </Button>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownNav;
