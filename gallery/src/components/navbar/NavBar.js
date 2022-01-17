import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Form, Navbar } from "react-bootstrap";
import { useMemo } from "react";

import NavPageList from "./NavPageList";
import DropdownProfile from "../dropdown/DropdowProfile";

import logo from "./../../assets/img/logo.svg";
import Notification from "../../components/notifications/Notifications";
import { ReactComponent as Search } from "../../assets/img/icons/search.svg";
import { ReactComponent as SignIn } from "../../assets/img/icons/sign-in.svg";
import { ReactComponent as Close } from "../../assets/img/icons/close.svg";
import { useHistory } from "react-router";
const NavBar = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { currentUser } = useSelector((state) => state.user);
  var notifications = true;
  var currentUserId = "";
  if (currentUser) {
    currentUserId = currentUser._id;
  }
  const { isAuthorized, isSetUp } = useSelector((state) => state.auth);
  const userDetailsPath = useMemo(
    () => `/user-details/${currentUserId}`,
    [currentUserId]
  );
  const [btnToggleClass, setBtnToggleClass] = useState("header__btn");
  const [menuToggleClass, setMenuToggleClass] = useState("header__menu");
  const [searchToggleClass, setSearchToggleClass] = useState("header__search");
  const [query, setQuery] = useState("");
  const toggleMenu = () => {
    if (btnToggleClass === "header__btn") {
      setBtnToggleClass("header__btn header__btn--active");
      setMenuToggleClass("header__menu header__menu--active");
    } else {
      setBtnToggleClass("header__btn");
      setMenuToggleClass("header__menu");
    }
  };

  const toggleSearch = (value) => {
    if (searchToggleClass === "header__search")
      setSearchToggleClass("header__search header__search--active");
    else setSearchToggleClass("header__search");
  };

  const onSearch = () => {
    history.push({ pathname: "/search", search: `?query=${query}` });
  };

  return (
    <Navbar className="header">
      <div className="header__content">
        <Navbar.Brand className="header__logo">
          <Link to="/">
            <img style={{ backgroundColor: "white" }} src={logo} alt="logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Form
          onSubmit={onSearch}
          className={searchToggleClass}
          style={{ zIndex: 2 }}
        >
          <Form.Control
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search items, collections, and creators"
          />
          <Button variant="empty" type="submit" onClick={onSearch}>
            <Search />
          </Button>
        </Form>

        <Navbar.Collapse className={menuToggleClass} id="basic-navbar-nav">
          <NavPageList />
        </Navbar.Collapse>

        <div className="header__actions">
          <div className="header__action header__action--search">
            <button
              className="header__action-btn"
              type="button"
              onClick={toggleSearch}
            >
              <Search />
            </button>
          </div>
          {currentUserId && (
            <Link variant="empty" to={userDetailsPath}>
              <Notification notificationsNumber={5}></Notification>
            </Link>
          )}

          <div
            className={
              isAuthorized
                ? "header__action header__action--profile"
                : "header__action header__action--signin"
            }
          >
            {isAuthorized ? (
              <DropdownProfile />
            ) : (
              <Link
                className="header__action-btn header__action-btn--signin"
                to="/login"
              >
                <span>{t("sign-in")}</span>
                <SignIn />
              </Link>
            )}
          </div>
        </div>

        <button className={btnToggleClass} type="button" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </Navbar>
  );
};

export default NavBar;
