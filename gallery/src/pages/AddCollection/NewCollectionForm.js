import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { retrieveUser } from "../../store/UserSlice";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Row, Col, Button, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import {
  styleLogo,
  styleBanner,
  thumbsContainer,
  thumb,
  thumbInner,
  img,
} from "../../constants/dropZoneconstants";
import { useNotify } from "../../providers/notify";
import { useDispatch } from "react-redux";
import FormikForm from "../../components/form/FormikForm";
import { TextInput, SingleSelect } from "../../components/form/FormikFields";

import { categoryOptions } from "../../constants/items";
import { createCollection } from "../../store/CollectionSlice";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("validation.required.item-title"),
  description: Yup.string().required("validation.required.description"),

  category: Yup.string()
    .oneOf(
      categoryOptions.map((d) => d.value),
      "validation.required.category"
    )
    .required("validation.required.category"),
});

const NewCollectionForm = () => {
  const { userId } = useSelector((state) => state.auth);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const { showNotification } = useNotify();
  const [logoImage, setlogoImage] = useState([]);
  const [bannerImage, setbannerImage] = useState([]);

  const logo = useDropzone({
    maxFiles: 1,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setlogoImage(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const banner = useDropzone({
    maxFiles: 1,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setbannerImage(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });
  const thumbsLogo = logoImage.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <Image src={file.preview} style={img} />
      </div>
    </div>
  ));
  const thumbsBanner = bannerImage.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <Image src={file.preview} style={img} />
      </div>
    </div>
  ));
  const formModel = {
    title: "",
    category: "",
    description: "",
  };
  const data = {
    owner: user.username,
    ownerId: userId,
    title: "",
    category: "",
  };

  const fetchUser = () => {
    dispatch(retrieveUser(userId))
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult);
        setUser(originalPromiseResult.body.data);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };
  useEffect(async () => {
    fetchUser();
  }, []);
  const changeLogo = () => {
    console.log(logoImage);
    console.log(bannerImage);
  };
  const onSubmit = (values) => {
    console.log(values);
    console.log(logoImage);
    console.log(bannerImage);
    data.title = values.title;
    data.category = values.category;
    data.logo = logoImage;
    data.banner = bannerImage;
    console.log("data", data);

    dispatch(createCollection(data))
      .unwrap()
      .then((originalPromiseResult) => {
        showNotification({
          type: "success",
          message: "Item created",
        });
        history.push("/collections", { isNotifyPersist: true });
        
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };

  return (
    <FormikForm
      initialValues={formModel}
      validationSchema={validationSchema}
      formClasses="sign__form--create"
      enableReinitialize
      onSubmit={onSubmit}
    >
      <Row className="w-100">
        <Col className="col-12">
          <h4 className="sign__title">{t("logo-image")}</h4>
          <h6 className="text-muted">
            This image will also be used for navigation. 350x 350 recommended.
          </h6>
        </Col>
        <section className="container mt-2">
          <div
            name="file-logo"
            {...logo.getRootProps({
              style: styleLogo,
              className: "dropzone-logo",
            })}
          >
            <input
              onChange={changeLogo(thumbsLogo)}
              {...logo.getInputProps()}
            />
            <Image
              style={{ width: "100px" }}
              src={require("../../assets/img/picture 2.png").default}
              fluid
            />
            <p>Drag and drop your file here, or click to select a file</p>
          </div>
          <aside style={thumbsContainer}>{thumbsLogo}</aside>
        </section>
        {/* <Col className="col-12">
          <div className="sign__file h-100">
            <div
              onClick={onClickLogo}
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "350px",
                height: "350px",
                backgroundColor: "transparent",
                borderRadius: "50%",
                borderStyle: "dashed",
              }}
            >
              <img
                style={{ width: "100px", height: "100px" }}
                src={picture}
                alt="pic"
              />
            </div>

            <input
              data-name="#file1"
              id="sign__file-upload"
              name="file"
              className="sign__file-upload"
              type="file"
              
              accept="video/mp4,video/x-m4v,video/*,.png,.jpg,.jpeg"
            />
          </div>
        </Col> */}

        <Col className="col-12">
          <h4 className="sign__title">Banner Image</h4>
          <h6 className="text-muted">
            (optional)This image will appear at the top of your collection page.
            Avoid including too much text in this banner image, as the
            dimensions change on different devices. 1400 x 400 recommended.
          </h6>
        </Col>
        <section className="container mt-2 ">
          <div
            name="file-banner"
            {...banner.getRootProps({
              style: styleBanner,
              className:
                "dropzone-banner d-flex justify-content-center align-items-center",
            })}
          >
            <input
              onChange={changeLogo(thumbsBanner)}
              {...banner.getInputProps()}
            />
            <Image
              style={{ width: "100px" }}
              src={require("../../assets/img/picture 2.png").default}
              fluid
            />
            <p>Drag and drop your file here, or click to select a file</p>
          </div>
          <aside style={thumbsContainer}>{thumbsBanner}</aside>
        </section>
        {/* <Col className="col-12">
          <div className="sign__file h-100">
            <div
              onClick={onClickLogo}
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "800px",
                height: "400px",
                backgroundColor: "transparent",
                borderStyle: "dashed",
              }}
            >
              <img
                style={{ width: "100px", height: "100px" }}
                src={picture}
                alt="pic"
              />
            </div>

            <input
              data-name="#file1"
              id="sign__file-upload"
              name="file"
              className="sign__file-upload"
              type="file"
              accept="video/mp4,video/x-m4v,video/*,.png,.jpg,.jpeg"
            />
          </div>
        </Col> */}

        <Col className="col-12">
          <h4 className="sign__title">Title</h4>
        </Col>

        <Col className="col-12">
          <TextInput
            name="title"
            placeholder={t("new-item-page.form.placeholder.item-name")}
          />
        </Col>

        <Col className="col-12">
          <h4 className="sign__title">URL</h4>
        </Col>

        <Col className="col-12">
          <TextInput
            name="url"
            placeholder="https://opensea.io/assets/treasures-of-the-sea"
          />
        </Col>

        <Col className="col-12">
          <h4 className="sign__title">Description</h4>
          <h6 className="text-muted">
            <a href="https://www.markdownguide.org/">Markdown</a> syntax is
            supported. 0 of 1000 characters used.
          </h6>
        </Col>
        <Col className="col-12">
          <TextInput
            name="description"
            placeholder={t("new-item-page.form.placeholder.description")}
            inputClass="sign__textarea"
            as="textarea"
            rows="4"
          />
        </Col>

        <Col className="col-12">
          <h4 className="sign__title">Category</h4>
          <h6 className="text-muted">
            Adding a category will help make your item discoverable on OpenSea
          </h6>
        </Col>
        <Col className="col-12">
          <SingleSelect
            name="category"
            options={categoryOptions}
            optionIdPrefix="category"
            withoutTranslation={true}
          />
        </Col>

        <Col className="col-12 col-xl-3">
          <Button className="sign__btn" variant="primary" type="submit">
            Create
          </Button>
        </Col>
      </Row>
    </FormikForm>
  );
};

export default NewCollectionForm;
