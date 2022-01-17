import React from "react";

import SocialItem from "./SocialItem";

import { ReactComponent as FbIcon } from "../../assets/img/social/fb.svg";
import { ReactComponent as Social1Icon } from "../../assets/img/social/social-1.svg";
import { ReactComponent as InstagramIcon } from "../../assets/img/social/instagram.svg";
import { ReactComponent as TwitterIcon } from "../../assets/img/social/twitter.svg";
import { ReactComponent as BkIcon } from "../../assets/img/social/bk.svg";
import { ReactComponent as Social2Icon } from "../../assets/img/social/social-2.svg";
import { ReactComponent as MailIcon } from "../../assets/img/social/mail.svg";

const socialItems = [
  { path: "#/", icon: FbIcon },
  { path: "#/", icon: Social1Icon },
  { path: "#/", icon: InstagramIcon },
  { path: "#/", icon: TwitterIcon },
  { path: "#/", icon: BkIcon },
  { path: "#/", icon: Social2Icon },
  { path: "#/", icon: MailIcon },
];

const SocialList = ({ className }) => {
  return (
    <div className={className}>
      {socialItems.map((item, index) => (
        <SocialItem key={index} path={item.path} icon={item.icon} />
      ))}
    </div>
  );
};

export default SocialList;
