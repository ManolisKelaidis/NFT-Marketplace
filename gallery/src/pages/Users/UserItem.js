import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ProtectedButton from "../../components/button/ProtectedButton";

import userBgImg from "../../assets/img/bg/bg-small.png";
import avatarImg from "../../assets/img/avatars/avatar5.jpg";

const UserItem = ({ user }) => {
  const { userId } = useSelector((state) => state.auth);
  const userDetailsPath = useMemo(() => `/user-details/${user._id}`, [user]);
  const [isFollowing, setIsFollowing] = useState(
    user ? user.isFollowing : false
  );

  const toggleFollowing = () => setIsFollowing(!isFollowing);

  return (
    <div className="author">
      <Link to={userDetailsPath} className="author__cover author__cover--bg">
        <img src={userBgImg} alt="not_available" />
      </Link>

      <div className="author__meta">
        <Link
          to={userDetailsPath}
          className={`author__avatar${
            user.verified ? " author__avatar--verified" : ""
          }`}
        >
          <img src={avatarImg} alt="not_available" />
        </Link>

        <h3 className="author__name">{`${user.firstName} ${user.lastName}`}</h3>

        <h3 className="author__nickname">
          <Link to={userDetailsPath}>{<span>@{user.username}</span>}</Link>
        </h3>

        <p className="author__text">{user.description}</p>

        <div className="author__wrap">
          <div className="author__followers">
            <p>{user.followers}</p>

            <span>Followers</span>
          </div>

          {userId !== user._id && (
            <ProtectedButton
              className="author__follow"
              variant="secondary"
              onClick={toggleFollowing}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </ProtectedButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserItem;
