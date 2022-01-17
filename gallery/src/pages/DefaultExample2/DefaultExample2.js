import React, { useState, useRef } from "react";
import _ from "lodash";

import EthereumProvider, {
  useEthereumSelector,
  useEthereumDispatch,
} from "../../providers/ethereum";

import { createNFT, retrieveOwners } from "../../store/EthereumSlice";

const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
};

const ChildExample = () => {
  const ethereumDispatch = useEthereumDispatch();
  const { account, colors, owners } = useEthereumSelector();
  const colorRef = useRef();
  const [currentFile, setCurrentFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const selectFile = (event) => {
    console.log("file is: ", event.target.files[0]);

    setFileName(_.get(event.target.files[0], "name"));

    console.log("File name is: ", fileName);
    getBase64(event.target.files[0], (result) => {
      console.log("Base 64 image is: ", result);
      setCurrentFile(result);
    });
  };

  const submitForm = async (event) => {
    try {
      event.preventDefault();
      console.log(colorRef.current.value);

      await ethereumDispatch(
        createNFT({
          color: colorRef.current.value,
          file: currentFile,
          fileName,
        })
      ).unwrap();
      await ethereumDispatch(retrieveOwners({})).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="text-white p-5">
      EXAMPLE 2
      <nav className="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="http://www.dappuniversity.com/bootcamp"
          target="_blank"
          rel="noopener noreferrer"
        >
          Color Tokens
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <small className="text-white">
              <span id="account">
                <b>Account:</b> {account}
              </span>
            </small>
          </li>
        </ul>
      </nav>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-6 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <h1>Issue Token</h1>
              <form onSubmit={submitForm}>
                <input
                  type="text"
                  className="form-control mb-1"
                  placeholder="e.g. #FFFFFF"
                  ref={colorRef}
                />
                <input
                  type="submit"
                  className="btn btn-block btn-primary"
                  value="MINT"
                />
              </form>
            </div>
          </main>
          <div className="col-lg-6 d-flex text-center">
            <label className="btn btn-default p-0">
              <input type="file" accept="image/*" onChange={selectFile} />
            </label>
          </div>
        </div>

        <hr />
        <div className="row text-center">
          {colors &&
            colors.map((color, key) => {
              return (
                <div key={key} className="col-md-3 mb-3 container">
                  <div className="owner box">
                    <b>Owner:</b> {owners[key]}
                  </div>
                  <div
                    className="token"
                    style={{ backgroundColor: color }}
                  ></div>
                  <div>{color}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const DefaultExample2 = () => {
  return (
    <EthereumProvider>
      <ChildExample />
    </EthereumProvider>
  );
};

export default DefaultExample2;
