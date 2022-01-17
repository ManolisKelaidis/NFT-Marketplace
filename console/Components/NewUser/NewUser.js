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

import './User.css';


const UsersCreate = () => {
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
            Create New Users | Skote - Responsive Bootstrap 5 Admin Dashboard
          </title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Users" breadcrumbItem="Create New" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Create New User</CardTitle>
                  <Form>
                    
<FormGroup className="mb-4" row>
  <Label htmlFor="username" className="col-form-label col-lg-2">username</Label>
  <Col lg="10">
    <Input
      id="username"
      name="username"
      type="text"
      className="form-control"
      placeholder="Enter username..."
      minlength=""
    />
  </Col>
</FormGroup>
<FormGroup className="mb-4" row>
  <Label htmlFor="email" className="col-form-label col-lg-2">email</Label>
  <Col lg="10">
    <Input
      id="email"
      name="email"
      type="text"
      className="form-control"
      placeholder="Enter email..."
      minlength=""
    />
  </Col>
</FormGroup>
<FormGroup className="mb-4" row>
  <Label htmlFor="firstName" className="col-form-label col-lg-2">firstName</Label>
  <Col lg="10">
    <Input
      id="firstName"
      name="firstName"
      type="text"
      className="form-control"
      placeholder="Enter firstName..."
      minlength=""
    />
  </Col>
</FormGroup>
<FormGroup className="mb-4" row>
  <Label htmlFor="lastName" className="col-form-label col-lg-2">lastName</Label>
  <Col lg="10">
    <Input
      id="lastName"
      name="lastName"
      type="text"
      className="form-control"
      placeholder="Enter lastName..."
      minlength=""
    />
  </Col>
</FormGroup>
<FormGroup className="mb-4" row>
  <Label htmlFor="description" className="col-form-label col-lg-2">description</Label>
  <Col lg="10">
    <Input
      id="description"
      name="description"
      type="text"
      className="form-control"
      placeholder="Enter description..."
      minlength=""
    />
  </Col>
</FormGroup>
<FormGroup className="mb-4" row>
  <Label htmlFor="password" className="col-form-label col-lg-2">password</Label>
  <Col lg="10">
    <Input
      id="password"
      name="password"
      type="text"
      className="form-control"
      placeholder="Enter password..."
      minlength=""
    />
  </Col>
</FormGroup>
<FormGroup className="mb-4" row>
  <Label htmlFor="facebookId" className="col-form-label col-lg-2">facebookId</Label>
  <Col lg="10">
    <Input
      id="facebookId"
      name="facebookId"
      type="text"
      className="form-control"
      placeholder="Enter facebookId..."
      minlength=""
    />
  </Col>
</FormGroup>
<FormGroup className="mb-4" row>
  <Label htmlFor="instagramId" className="col-form-label col-lg-2">instagramId</Label>
  <Col lg="10">
    <Input
      id="instagramId"
      name="instagramId"
      type="text"
      className="form-control"
      placeholder="Enter instagramId..."
      minlength=""
    />
  </Col>
</FormGroup>
<FormGroup className="mb-4" row>
  <Label htmlFor="twitterId" className="col-form-label col-lg-2">twitterId</Label>
  <Col lg="10">
    <Input
      id="twitterId"
      name="twitterId"
      type="text"
      className="form-control"
      placeholder="Enter twitterId..."
      minlength=""
    />
  </Col>
</FormGroup>
<FormGroup className="mb-4" row>
  <Label htmlFor="mysiteId" className="col-form-label col-lg-2">mysiteId</Label>
  <Col lg="10">
    <Input
      id="mysiteId"
      name="mysiteId"
      type="text"
      className="form-control"
      placeholder="Enter mysiteId..."
      minlength=""
    />
  </Col>
</FormGroup>
<FormGroup className="mb-4" row>
  <Label htmlFor="followers" className="col-form-label col-lg-2">followers</Label>
  <Col lg="10">
    <Input
      id="followers"
      name="followers"
      type="text"
      className="form-control"
      placeholder="Enter followers..."
      minlength=""
    />
  </Col>
</FormGroup>
<FormGroup className="mb-4" row>
  <Label htmlFor="profilePic" className="col-form-label col-lg-2">profilePic</Label>
  <Col lg="10">
    <Input
      id="profilePic"
      name="profilePic"
      type="text"
      className="form-control"
      placeholder="Enter profilePic..."
      minlength=""
    />
  </Col>
</FormGroup>
<FormGroup className="mb-4" row>
  <Label htmlFor="totalEtherium" className="col-form-label col-lg-2">totalEtherium</Label>
  <Col lg="10">
    <Input
      id="totalEtherium"
      name="totalEtherium"
      type="text"
      className="form-control"
      placeholder="Enter totalEtherium..."
      minlength=""
    />
  </Col>
</FormGroup>
<FormGroup className="mb-4" row>
  <Label htmlFor="type" className="col-form-label col-lg-2">type</Label>
  <Col lg="10">
    <select className="form-control" id="type" name="type">
      
<option>admin</option>
<option>consumer</option>
    </select>
  </Col>
</FormGroup>

                    <FormGroup className="mb-4" row>
                      <Label className="col-form-label col-lg-2">
                        User Date
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
                        htmlFor="userbudget"
                        className="col-form-label col-lg-2"
                      >
                        Budget
                      </label>
                      <Col lg="10">
                        <Input
                          id="userbudget"
                          name="userbudget"
                          type="text"
                          placeholder="Enter User Budget..."
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
                        Create User
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

export default UsersCreate;
    