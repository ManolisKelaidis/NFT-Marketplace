import React from "react";

import DropdownNav from "../dropdown/DropdownNav";
import NavItem from "./NavItem";

const nftMarketplaceList = [
  { name: "menu.explore", path: "/explore" },
  { name: "menu.users", path: "/users" },
  { name: "menu.collections", path: "/collections" },
  { name: "menu.privacy-policy", path: "/privacy-policy" },
];

const communityList = [
  { name: "menu.contacts", path: "/contact" },
  { name: "menu.other", path: "/other" },
];

const pages = [
  { isGrouped: false, name: "menu.home", path: "/home" },
  {
    isGrouped: true,
    name: "menu.nft-marketplace",
    path: "#",
    items: nftMarketplaceList,
  },
  {
    isGrouped: true,
    name: "menu.community",
    path: "#",
    items: communityList,
  },
];

const NavPageList = () => {
  return (
    <ul className="header__nav">
      {pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.isGrouped ? (
            <DropdownNav title={page.name} items={page.items} />
          ) : (
            <NavItem itemDetails={page} />
          )}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default NavPageList;
