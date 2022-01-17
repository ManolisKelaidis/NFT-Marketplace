import React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { css } from "@emotion/react";
import { Row, Col, Button, Image } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAsset } from "../../store/AssetSlice";
import information from "../../assets/img/information 1.png";
import { useSelector } from "react-redux";
import FormikForm from "../../components/form/FormikForm";
import { useNotify } from "../../providers/notify";
import { useLoader } from "../../providers/loader";
import LoadingOverlay from "react-loading-overlay";
import { SpinnerDotted } from "spinners-react";
import { retrieveCollections } from "../../store/CollectionSlice";
import { retrieveUser } from "../../store/UserSlice";
import TagInput from "../../components/TagInput/TagInput";
import ReactDOM from "react-dom";
import { WithContext as ReactTags } from "react-tag-input";

import {
  style,
  styleLogo,
  styleBanner,
  thumbsContainer,
  thumb,
  thumbInner,
  img,
} from "../../constants/dropZoneconstants";
import {
  TextInput,
  SingleSelect,
  RadioGroup,
} from "../../components/form/FormikFields";

import { itemRoyalties, itemTypes, blockchains } from "../../constants/items";

const data = {
  owner: "",
  collectionId: "",
  description: "",
  title: "",
  saleType: "",
  likes: "0",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("validation.required.item-name"),
  description: Yup.string().required("validation.required.description"),
  collection: Yup.string().required("Collection is required"),
  price: Yup.string().required("validation.required.size"),
  properties: Yup.string().required("validation.required.properties"),
  saleType: Yup.string()
    .oneOf(
      itemTypes.map((d) => d.value),
      "validation.required.type"
    )
    .required("validation.required.type"),
});
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

var categoryOptions = [];

const CreateItem = () => {
  const { userId } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { showNotification } = useNotify();
  const { loading, setLoading } = useLoader();
  const [files, setFiles] = useState([]);
  const [user, setUser] = useState({});
  const [collections, setCollections] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  const formModel = {
    title: "",
    file: [],
    link: "",
    description: "",
    collection: "",
    price: "",
    properties: "",
    saleType: "",
  };

  const onChange = (e) => {
    // console.log(e);
  };
  const sortCollections = () => {
    // collections.map((item) => {
    //   if (item.ownerId === userId) collectionsList.push(item);
    // });
    // console.log(collectionsList);

    // collectionsList.map((item) => {
    //   console.log(item)
    //   categoryOptions.push({ value: item._id, label: item.title });
    // });
    // const filteredCollections = collections.filter((c) => c.ownerId === userId)
    // categoryOptions = filteredCollections.map((item) => ({
    //   value: item._id,
    //   label: item.title,
    // }));

    categoryOptions = collections
      .filter((c) => c.ownerId === userId)
      .map((item) => ({ value: item._id, label: item.title }));
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

  const fetchCollections = () => {
    dispatch(retrieveCollections({ category: "Music" }))
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult);
        setCollections(originalPromiseResult.body.data);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };

  useEffect(async () => {
    fetchUser();
    fetchCollections();
  }, []);

  useEffect(async () => {
    console.log(collections);
    if (collections.length > 0) sortCollections();
  }, [collections]);

  const onSubmit = (values) => {
    setLoading(true);
    console.log(values);
    data.title = values.title;
    data.owner = user.username;
    data.description = values.description;
    data.saleType = values.saleType;
    data.collectionId = values.collection;
    console.log(files);

    data.file = files;
    data.price = values.price;

    console.log(data);
    setTimeout(() => {
      dispatch(createAsset(data))
        .unwrap()
        .then((originalPromiseResult) => {
          console.log(originalPromiseResult);
          setLoading(false);
          showNotification({
            type: "success",
            message: "Item created",
          });
          history.push("/home", { isNotifyPersist: true });
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log(rejectedValueOrSerializedError);
        });
    }, 5000);
  };

  return (
    <LoadingOverlay
      active={loading}
      spinner={
        <SpinnerDotted
          size={200}
          thickness={100}
          speed={100}
          color="#36ad47"
          secondaryColor="rgba(0, 0, 0, 0.44)"
        />
      }
    >
      <FormikForm
        initialValues={formModel}
        validationSchema={validationSchema}
        formClasses="sign__form--create"
        enableReinitialize
        onSubmit={onSubmit}
      >
        <Row className="w-100">
          <Col className="col-12">
            <h5 className="sign__title">Image,Video,Audio,or 3D Model</h5>
          </Col>
          <Col className="col-12">
            <h6 className="text-light text-muted">
              File types supported : JPG,PNG,GIF,SVG,MP4,WAV,OGG,GLB,GLTF.Max
              size 40Mb.{" "}
            </h6>
          </Col>

          <section className="container mt-2">
            <div
              name="file"
              {...getRootProps({ style, className: "dropzone" })}
            >
              <input onChange={onChange(thumbs)} {...getInputProps()} />
              <Image
                style={{ width: "100px" }}
                src={require("../../assets/img/picture 2.png").default}
                fluid
              />
              <p>Drag and drop your file here, or click to select a file</p>
            </div>
            <aside style={thumbsContainer}>{thumbs}</aside>
          </section>

          <Col className="text-bold col-12">
            <h5 className="font-weight-bold text-light">
              Name <span>*</span>
            </h5>
            <TextInput
              name="title"
              placeholder={t("new-item-page.form.placeholder.item-name")}
            />
          </Col>
          <Col className="col-12">
            <h5 className="font-weight-bold text-light">External link</h5>
            <h6 className="text-light text-muted">
              OpenSea will include a link to this item's URL syntax is
              supported"{" "}
            </h6>
            <TextInput
              name="link"
              placeholder={t("new-item-page.form.placeholder.link")}
            />
          </Col>

          <Col className="col-12">
            <h5 className="font-weight-bold text-light">Description </h5>
            <h6 className="text-light text-muted">
              This description will be added to the item's description page.
              <a href="https://www.markdownguide.org/">Markdown</a> syntax is
              supported"{" "}
            </h6>
            <TextInput
              name="description"
              placeholder={t("new-item-page.form.placeholder.description")}
              inputClass="sign__textarea"
              as="textarea"
              rows="4"
            />
          </Col>

          <Col className="col-12">
            <h5 className="font-weight-bold text-light">
              Collection <span>*</span>{" "}
            </h5>
            <h6 className="text-light text-muted">
              OpenSea will include a link to this item's URL syntax is
              supported"{" "}
            </h6>
            <SingleSelect
              name="collection"
              options={categoryOptions}
              optionIdPrefix="collection"
              withoutTranslation={true}
            />
          </Col>
          <Col className="col-12">
            <h5 className="font-weight-bold text-light">Blockchain</h5>
            <h6 className="text-muted">
              Select the blockchain where you would like new items from this
              collection to be added by default.
              <img
                style={{ marginLeft: "0.5rem", width: "1rem", height: "1rem" }}
                src={information}
                alt="pic"
              />
            </h6>
            <SingleSelect
              name="blockchains"
              options={blockchains}
              optionIdPrefix="blockchains"
              withoutTranslation={true}
            />
          </Col>

          <Col className="col-12 col-md-4">
            <TextInput
              name="price"
              label="form.price"
              placeholder={t("new-item-page.form.placeholder.price")}
            />
          </Col>

          <Col className="col-12 col-md-4">
            <TextInput
              name="properties"
              label="form.properties"
              placeholder={t("new-item-page.form.placeholder.properties")}
            />
          </Col>
          <TagInput></TagInput>
          <Col className="col-12">
            <RadioGroup
              name="saleType"
              options={itemTypes}
              itemIdPrefix="type"
            />
          </Col>

          <Col className="col-12 col-xl-3">
            <Button className="sign__btn" variant="primary" type="submit">
              {t("create-item")}
            </Button>
          </Col>
        </Row>
      </FormikForm>
    </LoadingOverlay>
  );
};

export default CreateItem;
