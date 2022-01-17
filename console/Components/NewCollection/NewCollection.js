import React, { useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import Dropzone from "react-dropzone";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

//Import Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import './Collection.css';


const CollectionsCreate = () => {
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  const [selectedFiles, setselectedFiles] = useState([]);

  const startDateChange = (date) => {
    setstartDate(date);
  };

  const endDateChange = (date) => {
    setendDate(date);
  };

  function handleAcceptedFiles(files) {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );

    setselectedFiles(files);
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>
            Create New Collections | Skote - Responsive Bootstrap 5 Admin Dashboard
          </title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Collections" breadcrumbItem="Create New" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Create New Collection</CardTitle>
                  <Form>
                    
<FormGroup className="mb-4" row>
  <Label htmlFor="ownerId" className="col-form-label col-lg-2">ownerId</Label>
  <Col lg="10">
    <Input
      id="ownerId"
      name="ownerId"
      type="text"
      className="form-control"
      placeholder="Enter ownerId..."
      minlength=""
    />
  </Col>
</FormGroup>
<FormGroup className="mb-4" row>
  <Label htmlFor="title" className="col-form-label col-lg-2">title</Label>
  <Col lg="10">
    <Input
      id="title"
      name="title"
      type="text"
      className="form-control"
      placeholder="Enter title..."
      minlength=""
    />
  </Col>
</FormGroup>
<FormGroup className="mb-4" row>
  <Label htmlFor="owner" className="col-form-label col-lg-2">owner</Label>
  <Col lg="10">
    <Input
      id="owner"
      name="owner"
      type="text"
      className="form-control"
      placeholder="Enter owner..."
      minlength=""
    />
  </Col>
</FormGroup>
<FormGroup className="mb-4" row>
  <Label htmlFor="category" className="col-form-label col-lg-2">category</Label>
  <Col lg="10">
    <select className="form-control" id="category" name="category">
      
<option>Art</option>
<option>Photography</option>
<option>Games</option>
<option>Metaverses</option>
<option>Music</option>
<option>Domains</option>
<option>Memes</option>
    </select>
  </Col>
</FormGroup>

                    <FormGroup className="mb-4" row>
                      <Label className="col-form-label col-lg-2">
                        Collection Date
                      </Label>
                      <Col lg="10">
                        <Row>
                          <Col md={6} className="pr-0">
                            <DatePicker
                              className="form-control"
                              selected={startDate}
                              onChange={startDateChange}
                            />
                          </Col>
                          <Col md={6} className="pl-0">
                            {" "}
                            <DatePicker
                              className="form-control"
                              selected={endDate}
                              onChange={endDateChange}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </FormGroup>

                    <FormGroup className="mb-4" row>
                      <label
                        htmlFor="collectionbudget"
                        className="col-form-label col-lg-2"
                      >
                        Budget
                      </label>
                      <Col lg="10">
                        <Input
                          id="collectionbudget"
                          name="collectionbudget"
                          type="text"
                          placeholder="Enter Collection Budget..."
                          className="form-control"
                        />
                      </Col>
                    </FormGroup>
                  </Form>
                  <Row className="mb-4">
                    <Label className="col-form-label col-lg-2">
                      Attached Files
                    </Label>
                    <Col lg="10">
                      <Form>
                        <Dropzone
                          onDrop={(acceptedFiles) => {
                            handleAcceptedFiles(acceptedFiles);
                          }}
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div className="dropzone">
                              <div
                                className="dz-message needsclick"
                                {...getRootProps()}
                              >
                                <input {...getInputProps()} />
                                <div className="dz-message needsclick">
                                  <div className="mb-3">
                                    <i className="display-4 text-muted bx bxs-cloud-upload" />
                                  </div>
                                  <h4>Drop files here or click to upload.</h4>
                                </div>
                              </div>
                            </div>
                          )}
                        </Dropzone>
                        <div
                          className="dropzone-previews mt-3"
                          id="file-previews"
                        >
                          {selectedFiles.map((f, i) => {
                            return (
                              <Card
                                className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                key={i + "-file"}
                              >
                                <div className="p-2">
                                  <Row className="align-items-center">
                                    <Col className="col-auto">
                                      <img
                                        data-dz-thumbnail=""
                                        height="80"
                                        className="avatar-sm rounded bg-light"
                                        alt={f.name}
                                        src={f.preview}
                                      />
                                    </Col>
                                    <Col>
                                      <Link
                                        to="#"
                                        className="text-muted font-weight-bold"
                                      >
                                        {f.name}
                                      </Link>
                                      <p className="mb-0">
                                        <strong>{f.formattedSize}</strong>
                                      </p>
                                    </Col>
                                  </Row>
                                </div>
                              </Card>
                            );
                          })}
                        </div>
                      </Form>
                    </Col>
                  </Row>
                  <Row className="justify-content-end">
                    <Col lg="10">
                      <Button type="submit" color="primary">
                        Create Collection
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CollectionsCreate;
    