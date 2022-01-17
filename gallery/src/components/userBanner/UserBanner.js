import bgImg from "../../assets/img/bg/poster.jpg";
import pencil from "../../assets/img/pencil.svg";
import { useTabSelector } from "../../pages/UserDetails/provider";
import Dropzone from "../uploadFile/Dropzone";
import React, { useState } from "react";
import { Image } from "react-bootstrap";
import {
  thumbInner,
  imgBanner,
  styleUserBanner,
} from "../../constants/dropZoneconstants";
const UserBanner = ({ user }) => {
  const [bannerImage, setBannerImage] = useState([]);
  const fileUpload = async (acceptedFiles) => {
    const tmp = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setBannerImage(tmp);
    console.log(user);
  };
  const { isSettingsClicked } = useTabSelector();

  return (
    <div>
      {isSettingsClicked ? (
        <section>
          <Dropzone
            accept="image/*"
            className="dropzone "
            onUpload={fileUpload}
            style={styleUserBanner}
          >
            <Image
              style={{
                width: "25px",
                height: "25px",
                position: "absolute",
                right: "1px",
                top: "220px",
              }}
              src={pencil}
            />
            {bannerImage.length ? (
              bannerImage.map((file) => {
                return (
                  <div style={{ position: "relative" }}>
                    <Image style={imgBanner} src={file.preview} />
                  </div>
                );
              })
            ) : (
              <Image style={imgBanner} src={bgImg} fluid />
            )}
          </Dropzone>
        </section>
      ) : (
        <div
          className="main__author bg-img"
          style={{
            background: `url(${bgImg}) center center / cover no-repeat`,
          }}
        ></div>
      )}
    </div>
  );
};

export default UserBanner;
