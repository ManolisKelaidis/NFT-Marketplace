import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { retrieveUser } from "../../store/UserSlice";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Row, Col, Button, Image  } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

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

const NewCertificationForm = () => {
  const { userId } = useSelector((state) => state.auth);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const { showNotification } = useNotify();
  const [logoImage, setlogoImage] = useState([]);
  const [document, setDocument] = useState([]);
  const [viewPdf, setViewPdf] = useState(null);

  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const logo = useDropzone({
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

  const documentSetup = useDropzone({
    accept: ".pdf,.doc",
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      setDocument(acceptedFiles);
    },
  });
  console.log(document);
  const thumbsLogo = logoImage.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <Image src={file.preview} style={img} />
      </div>
    </div>
  ));
  // const thumbsBanner = document.map((file) => (
  //   <div style={thumb} key={file.name}>
  //     <div style={thumbInner}>
  //       <Image src={file.preview} style={img} />
  //     </div>
  //   </div>
  // ));
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
    console.log(document);

    let reader = new FileReader();
    // console.log(document[0])
    console.log(document instanceof Blob);
    if (document.length) {
      const blob = new Blob(document);
      console.log(blob);

      reader.readAsDataURL(blob);
      reader.onloadend = (e) => {
        console.log(e.target.result);
        setViewPdf(e.target.result);
      };
    }
  };
  const onSubmit = (values) => {
    console.log(values);
    console.log(logoImage);
    console.log(document);
    data.title = values.title;
    data.category = values.category;
    data.logo = logoImage;
    data.banner = document;
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
          <h4 className="sign__title">Image , video ,audio or 3D Model</h4>
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
            <p>Drag and drop your files here, or click to select files</p>
          </div>
          <aside style={thumbsContainer}>{thumbsLogo}</aside>
        </section>

        {/* <Col className="col-12">
          <h4 className="sign__title">Documentation for identification</h4>
          <h6 className="text-muted">
            (optional)This image will appear at the top of your collection page.
            Avoid including too much text in this banner image, as the
            dimensions change on different devices. 1400 x 400 recommended.
          </h6>
        </Col> */}
        {/* <section className="container mt-2 ">
          <div
            name="file-banner"
            {...documentSetup.getRootProps({
              style: styleBanner,
              className:
                "dropzone-banner d-flex justify-content-center align-items-center",
            })}
          >
            <input
              // onChange={changeLogo(thumbsBanner)}
              {...documentSetup.getInputProps()}
            />
            <Image
              style={{ width: "100px" }}
              src={require("../../assets/img/picture 2.png").default}
              fluid
            />
            <p>Drag and drop your file here, or click to select a file</p>
          </div>
          {viewPdf && (
            <div
              style={{
                marginTop:"10px",
                width: "800px",
                height: "300px",
                backgroundColor: "#e4e4e4",
                overflowY: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={viewPdf}
                  plugins={[defaultLayoutPluginInstance]}
                ></Viewer>
              </Worker>
            </div>
          )}
        </section> */}

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
        <div className="pdf-container">View PDF</div>
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
          <Link className="sign__btn" variant="primary" to={"/new-document"} >
            Next
          </Link>
        </Col>
      </Row>
    </FormikForm>
  );
};

export default NewCertificationForm;
