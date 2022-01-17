import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import { retrieveUser } from "../../store/UserSlice";

import ProtectedButton from "../button/ProtectedButton";
import SocialItem from "../social/SocialItem";
import {
  style,
  thumb,
  thumbInner,
  img,
} from "../../constants/dropZoneconstants";
import avatarImg from "../../assets/img/avatars/profile.png";
import { ReactComponent as CopyIcon } from "../../assets/img/icons/copy.svg";
import { ReactComponent as WebIcon } from "../../assets/img/icons/web.svg";
import { ReactComponent as Social3Icon } from "../../assets/img/social/social-3.svg";
import { ReactComponent as InstagramIcon } from "../../assets/img/social/instagram.svg";
import { ReactComponent as TwitterIcon } from "../../assets/img/social/twitter.svg";
import { ReactComponent as MediumIcon } from "../../assets/img/social/medium.svg";
import { useTabSelector } from "../../pages/UserDetails/provider";
import { useSelector } from "react-redux";
import { updateUser } from "../../store/UserSlice";

const socialItems = [
  { path: "#/", icon: Social3Icon },
  { path: "#/", icon: InstagramIcon },
  { path: "#/", icon: TwitterIcon },
  { path: "#/", icon: MediumIcon },
];
const UserInfo = ({ isUserCilckable = true }) => {
  const { userId } = useSelector((state) => state.auth);
  const { isSettingsClicked } = useTabSelector();
  const params = useParams();
  const profileId = params.id ? params.id : userId;
  const authUserId = userId;

  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const userDetailsPath = useMemo(() => `/user-details/${userId}`, [userId]);
  var firstName = user.firstname ? user.firstname : "";
  var lastName = user.lastName ? user.lastName : "";
  const [logoImage, setlogoImage] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  // const [image, setImage] = useState(avatarImg);
  var info = {};

  const fetchUser = () => {
    return dispatch(retrieveUser(profileId))
      .unwrap()
      .then((originalPromiseResult) => {
        setUser(originalPromiseResult.body.data);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };
  const exampleFunction = async (acceptedFiles) => {
    const tmp = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setlogoImage(tmp);
    await fetchUser();
    console.log(tmp);
    info.profilePic = tmp;
    info = { ...user, ...info };
    console.log(info);
    dispatch(updateUser({ userId: userId, info }))
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };
  const logo = useDropzone({
    maxFiles: 1,
    accept: "image/*",
    onDrop: exampleFunction,
  });

  useMemo(() => {
    if (userId === profileId) {
      user.verified = true;
    } else {
      user.verified = false;
    }
    fetchUser();
  }, []);

  const toggleFollowing = () => setIsFollowing(!isFollowing);

  return (
    <div className="author author--page">
      <div className="author__meta">
        {isSettingsClicked ? (
          <section>
            <div
              name="file"
              {...logo.getRootProps({
                style,
                className: "dropzone   author__avatar author__avatar--verified",
              })}
            >
              <input {...logo.getInputProps()} />
              {/* <Image style={img} src={logoImage.preview} fluid /> */}
              {logoImage.length ? (
                logoImage.map((file) => {
                  return (
                    <div style={thumbInner}>
                      <Image src={file.preview} style={img} />
                    </div>
                  );
                })
              ) : (
                <Image style={img} src={avatarImg} alt={avatarImg} fluid />
              )}
            </div>
          </section>
        ) : (
          <section>
            <div
              name="file"
              {...logo.getRootProps({
                onClick: (event) => event.stopPropagation(),
                style,
                className: "dropzone author__avatar",
              })}
            >
              <input {...logo.getInputProps()} />
              {avatarImg ? (
                <Image style={img} src={avatarImg} fluid />
              ) : (
                logoImage.map((file) => {
                  return (
                    <div style={thumb} key={file.name}>
                      <div style={thumbInner}>
                        <Image src={file.preview} style={img} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>
          // <div
          //   className={`author__avatar${
          //     isSettingsClicked ? " author__avatar--verified" : ""
          //   }`}
          //   onClick={isSettingsClicked ? onButtonClick : doNothing}
          // >
          //   <img src={require("../../assets/img/picture 2.png")} alt="avatar_not_available" />
          // </div>
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
            <Link to={userDetailsPath}>{user.username}</Link>
          ) : (
            user.username
          )}
        </h2>

        <p className="author__text">{user.description}</p>

        <div className="author__code">
          <input type="text" defaultValue={user.code} id="author-code" />

          <Button variant="empty" className="p-0">
            <span>Copied</span>

            <CopyIcon />
          </Button>
        </div>

        <a href="author.html" className="author__link">
          <WebIcon /> {user.email}
        </a>

        <div className="author__social">
          {socialItems.map((item, index) => (
            <SocialItem key={index} path={item.path} icon={item.icon} />
          ))}
        </div>

        <div className="author__wrap">
          <div className="author__followers">
            <p>{user.followers}</p>

            <span>Followers</span>
          </div>

          {authUserId !== userId && (
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

export default UserInfo;
