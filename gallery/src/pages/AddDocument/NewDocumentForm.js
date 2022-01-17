import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { retrieveUser } from "../../store/UserSlice";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { Row, Col, Button, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Worker } from "@react-pdf-viewer/core";
import FilePreview from "../../components/FilePreview/FilePreview";
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

  const [title, SetTitle] = useState("");
  const [description, SetDescription] = useState("");
  const [file, Setfile] = useState([]);
  const [logoImage, setlogoImage] = useState([]);
  const [document, setDocument] = useState([]);
  const [viewPdf, setViewPdf] = useState(null);

  const [fileList, SetFileList] = useState([]);
  var tmpFileList = [];
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
        setViewPdf(e.target.result);
      };
    }
  };
  const changeTitle = (value) => {
    SetTitle(value);
    console.log(title);
  };

  const changeDescription = (value) => {
    SetDescription(value);
    console.log(description);
  };

  const onUpload = () => {
    const file = {
      title: title,
      description: description,
      file: document,
      fileView: viewPdf,
    };
    tmpFileList.push(file);
    SetFileList([...fileList, ...tmpFileList]);

    setViewPdf(null);
    setDocument([]);
  };
  const onSubmit = (values) => {
    data.title = values.title;
    data.category = values.category;
    data.logo = logoImage;
    data.banner = document;
    console.log("data", data);

    tmpFileList.push(data);
    console.log(tmpFileList);
    SetFileList(tmpFileList);
    setViewPdf(null);
    //   dispatch(createCollection(data))
    //     .unwrap()
    //     .then((originalPromiseResult) => {
    //       showNotification({
    //         type: "success",
    //         message: "Item created",
    //       });
    //       history.push("/collections", { isNotifyPersist: true });
    //     })
    //     .catch((rejectedValueOrSerializedError) => {
    //       console.log(rejectedValueOrSerializedError);
    //     });
    // };
  };
  return (
    <div>
      <FormikForm
        initialValues={formModel}
        validationSchema={validationSchema}
        formClasses="sign__form--create"
        enableReinitialize
        onSubmit={onSubmit}
      >
        <Row className="w-100">
          <Col className="col-12">
            <h4 className="sign__title">Documentation for identification</h4>
            <h6 className="text-muted">
              (optional)This image will appear at the top of your collection
              page. Avoid including too much text in this banner image, as the
              dimensions change on different devices. 1400 x 400 recommended.
            </h6>
          </Col>
          <section className="container mt-2 ">
            <div
              name="file-banner"
              {...documentSetup.getRootProps({
                style: styleBanner,
                className:
                  "dropzone-banner d-flex justify-content-center align-items-center",
              })}
            >
              <input
                onChange={changeLogo(thumbsLogo)}
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
                  marginTop: "10px",
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
                    // plugins={[defaultLayoutPluginInstance]}
                  ></Viewer>
                </Worker>
              </div>
            )}
          </section>

          <Col className="col-12">
            <h4 className="sign__title">Document Name</h4>
          </Col>

          <Col className="col-12">
            <TextInput
              name="title"
              onChange={changeTitle}
              placeholder={t("new-item-page.form.placeholder.item-name")}
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
              onChange={changeDescription}
              as="textarea"
              rows="4"
            />
          </Col>

          <Col className="col-12 col-xl-3">
            <Button onClick={onUpload} className="sign__btn" variant="primary">
              Upload
            </Button>
          </Col>
        </Row>
      </FormikForm>
      <Col className="col-12 col-xl-3">
        {fileList &&
          fileList.map((d, index) => (
            <div>
              <div key={index} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                <FilePreview file={d}></FilePreview>
              </div>
            </div>
          ))}
        <Button disabled={fileList?true:false} className="sign__btn" variant="primary">
          Create
        </Button>
      </Col>
    </div>
  );
};

export default NewCertificationForm;
