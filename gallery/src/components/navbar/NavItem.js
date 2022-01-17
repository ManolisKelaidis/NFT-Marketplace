import { useTranslation } from "react-i18next";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavItem = ({ itemDetails }) => {
  const { t } = useTranslation();

  return (
    <Nav className="header__nav-item mr-auto">
      <Link className="header__nav-link" to={itemDetails.path}>
        {t(itemDetails.name)}
      </Link>
    </Nav>
  );
};

export default NavItem;
