import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ReactComponent as DownArrow } from "../../assets/img/icons/down-arrow.svg";
import { ReactComponent as ThreeDots } from "../../assets/img/icons/three-dots.svg";

const DropdownNav = ({ title, items }) => {
  const { t } = useTranslation();

  return (
    <Dropdown className="header__nav-item cursor-pointer" as="li">
      <Dropdown.Toggle
        id={`dropdown-nav-${title | "0"}`}
        className={
          title && title.length > 0
            ? "header__nav-link"
            : "header__nav-link header__nav-link--menu"
        }
        as="a"
        bsPrefix="c__none"
      >
        {title && title.length > 0 ? (
          <>
            {t(title)}
            <DownArrow />
          </>
        ) : (
          <ThreeDots />
        )}
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu header__nav-menu" as="ul">
        {items &&
          items.map((item, index) => {
            return (
              <Dropdown.Item key={index} as="li" bsPrefix="c__none">
                <Link to={item.path}>{t(item.name)}</Link>
              </Dropdown.Item>
            );
          })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownNav;
