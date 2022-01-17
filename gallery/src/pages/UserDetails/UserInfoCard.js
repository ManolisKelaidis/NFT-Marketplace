import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import ProtectedButton from "../../components/button/ProtectedButton";
import SocialItem from "../../components/social/SocialItem";
import Dropzone from "../../components/uploadFile/Dropzone";

import { useTabSelector } from "./provider";
import { retrieveUser } from "../../store/UserSlice";
import { updateUser } from "../../store/UserSlice";
import { style, thumbInner, img ,styleProfilePicture} from "../../constants/dropZoneconstants";

import avatarImg from "../../assets/img/avatars/profile.png";
import { ReactComponent as CopyIcon } from "../../assets/img/icons/copy.svg";
import { ReactComponent as WebIcon } from "../../assets/img/icons/web.svg";
import { ReactComponent as Social3Icon } from "../../assets/img/social/social-3.svg";
import { ReactComponent as InstagramIcon } from "../../assets/img/social/instagram.svg";
import { ReactComponent as TwitterIcon } from "../../assets/img/social/twitter.svg";
import { ReactComponent as MediumIcon } from "../../assets/img/social/medium.svg";

const socialItems = [
  { path: "#/", icon: Social3Icon },
  { path: "#/", icon: InstagramIcon },
  { path: "#/", icon: TwitterIcon },
  { path: "#/", icon: MediumIcon },
];

const UserInfoCard = ({ isUserCilckable = true }) => {
  const dispatch = useDispatch();
  const { isSettingsClicked } = useTabSelector();
  const { currentUser } = useSelector((state) => state.user);
  const { userId } = useSelector((state) => state.auth);
  const authUserId = userId;

  const [logoImage, setlogoImage] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  const currentUserId = currentUser._id;
  const userDetailsPath = useMemo(
    () => `/user-details/${currentUserId}`,
    [currentUserId]
  );

  const firstName = currentUser.firstName || "";
  const lastName = currentUser.lastName || "";

  const toggleFollowing = () => setIsFollowing(!isFollowing);

  const fetchUser = () => {
    return dispatch(retrieveUser(currentUserId))
      .unwrap()
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };

  const fileUpload = async (acceptedFiles) => {
    const tmp = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setlogoImage(tmp);

    const info = { ...currentUser, profilePic: tmp };

    dispatch(updateUser({ userId: currentUserId, info }))
      .unwrap()
      .then(() => fetchUser())
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };

  return (
    <div className="author author--page">
      <div className="author__meta">
        {isSettingsClicked ? (
          <section>
            <Dropzone
              accept="image/*"
              className="dropzone author__avatar author__avatar--verified"
              onUpload={fileUpload}
              style={styleProfilePicture}
            >
              {logoImage.length ? (
                logoImage.map((file) => {
                  return (
                    <div style={thumbInner}>
                      <Image style={img} src={file.preview} fluid />
                    </div>
                  );
                })
              ) : (
                <Image style={img} src={avatarImg} fluid />
              )}
            </Dropzone>
          </section>
        ) : (
          <section style={styleProfilePicture} className="author__avatar">
            <div>
              <Image style={img} src={avatarImg} fluid />
            </div>
          </section>
        )}

        <h1 className="author__name">
          {isUserCilckable ? (
            <Link to={userDetailsPath}>{`${firstName} ${lastName}`}</Link>
          ) : (
            `${firstName} ${lastName}`
          )}
        </h1>

        <h2 className="author__nickname text-primary">
          {isUserCilckable ? (
            <Link to={userDetailsPath}>{currentUser.username}</Link>
          ) : (
              <>
               {<span>@{currentUser.username}</span> }
             </>
          )}
        </h2>

        <p className="author__text">{currentUser.description}</p>

        <div className="author__code">
          <input type="text" defaultValue={currentUser.code} id="author-code" />

          <Button variant="empty" className="p-0">
            <span>Copied</span>

            <CopyIcon />
          </Button>
        </div>

        <a href="author.html" className="author__link">
          <WebIcon /> {currentUser.email}
        </a>

        <div className="author__social">
          {socialItems.map((item, index) => (
            <SocialItem key={index} path={item.path} icon={item.icon} />
          ))}
        </div>

        <div className="author__wrap">
          <div className="author__followers">
            <p>{currentUser.followers}</p>

            <span>Followers</span>
          </div>

          {authUserId !== currentUserId && (
            <React.Fragment>
              {isFollowing ? (
                <ProtectedButton
                  className="author__follow"
                  variant="secondary"
                  onClick={toggleFollowing}
                >
                  Unfollow
                </ProtectedButton>
              ) : (
                <ProtectedButton
                  className="author__follow"
                  variant="secondary"
                  onClick={toggleFollowing}
                >
                  Follow
                </ProtectedButton>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;
