import React from "react";
import "./DefaultExample.scss";
import { useEffect, useRef, useState } from "react";
import Web3 from "web3";
import Color from "../../abis/Color.json";
import axios from "axios";
import EthCrypto from "eth-crypto";
import _ from "lodash";

axios.defaults.baseURL = "http://localhost:3001";

const plirio = axios.create({
  baseURL: "https://nfts.plirio.com",
});

const handleSignMessage = ({ publicAddress, nonce }) => {
  const web3 = window.web3;
  console.log("Account in handeSignMessage: ", publicAddress);

  return new Promise((resolve, reject) => {
    web3.eth.personal
      .sign(
        `Sign this message to prove you have access to this wallet and we\'ll log you in. This won\'t cost Ether. \n\n To stop hackers from hacking keep this unique ID message they can\'t guess ${nonce}`,
        publicAddress
      )
      .then((signature) => resolve(signature))
      .catch((e) => {
        reject(e);
      });
  });
};

const DefaultExample = () => {
  const colorRef = useRef();
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  // const [totalSupply, setTotalSupply] = useState(0);
  const [colors, setColors] = useState([]);
  const [owners, setOwners] = useState([]);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [fileName, setFileName] = useState("");

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();

      // if account is not selected this will prompt the user to select an account
      await window.ethereum.enable().then(async (activeAccount) => {
        console.log("Ethereum enabled with active account: ", activeAccount);

        if (typeof activeAccount === "object") {
          activeAccount = activeAccount[0];
        }

        // this should happen only the first time during registration and after that it will be verified on the background
        handleSignMessage({
          publicAddress: activeAccount,
          nonce: "hard_to_guess",
        }).then((signature) => {
          console.log("This is not safe: ", signature);
        });
      });

      window.ethereum.on("connect", (handler) => {
        // able to send requests
        // not sure when this triggers
        console.log("Metamask connected to rpc network");
      });
      window.ethereum.on("disconnect", (handler) => {
        console.log("Metamask disconnected");
        // usefull for detecting network or other errors
      });

      window.ethereum.on("accountsChanged", (accounts) => {
        console.log("Account has been selected: ", accounts);
        // when metamask is logged out this event is also triggered and it returns an empty array
        setAccount(accounts[0]);

        handleSignMessage({
          publicAddress: accounts[0],
          nonce: "nonce_here",
        }).then((signature) => {
          console.log("Signature: ", signature);
        });
      });

      window.ethereum.on("chainChanged", (chainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        console.log("Chain has been changed to: ", chainId);
        // window.location.reload();
      });
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    let allColors = [];
    const web3 = window.web3;
    // Load accounts exposed by Metamask
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    // fetching the network id metamask is currently using
    const networkId = await web3.eth.net.getId();
    console.log("Network id is: ", networkId);
    // if it is has been deployed to other nets address and other relevant info will be here
    const networkData = Color.networks[networkId];
    console.log("Netsworks: ", Color.networks);

    if (networkData) {
      const abi = Color.abi;
      const address = networkData.address;
      console.log("ERC721 being used: ", address);
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
      const totalSupply = await contract.methods.totalSupply().call();
      // setTotalSupply(totalSupply);
      // Load Colors
      for (var i = 0; i < totalSupply; i++) {
        let color = await contract.methods.colors(i).call();
        allColors.push(color);
      }
      setColors(allColors);
    } else {
      window.alert("Smart contract not deployed to detected network.");
    }
  };

  const loadOwners = async () => {
    let allOwners = [];
    for (const color of colors) {
      let owner = await contract.methods.ownerOfColor(color).call();
      allOwners.push(owner);
    }
    setOwners(allOwners);
  };

  const encrypt = async (publicKey, data) => {
    console.log("unencrypted string: ", data);
    console.log("key ", publicKey);

    // const base64string = arrayBufferToBase64(data);
    // const stringifiedData = JSON.stringify(data);
    const enc = await EthCrypto.encryptWithPublicKey(publicKey, data);
    const encryptedString = EthCrypto.cipher.stringify(enc);
    console.log("Encrypted image, ", encryptedString);
    return Promise.resolve(encryptedString);
  };

  const decrypt = async (privateKey, encryptedData) => {
    const encryptedObject = EthCrypto.cipher.parse(encryptedData);
    const dec = await EthCrypto.decryptWithPrivateKey(
      privateKey,
      encryptedObject
    );
    // return Promise.resolve('data:image/jpeg;base64,' + dec);
    return Promise.resolve(dec);
  };

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

  const selectFile = (event) => {
    console.log("file is: ", event.target.files[0]);

    setFileName(_.get(event.target.files[0], "name"));

    console.log("File name is: ", fileName);
    getBase64(event.target.files[0], (result) => {
      console.log("Base 64 image is: ", result);
      setCurrentFile(result);
    });

    // setCurrentFile(event.target.files[0]);
  };

  const getNFTid = (description, image, name) => {
    return new Promise((resolve, reject) => {
      plirio
        .post(
          "nfts",
          {
            description,
            external_url:
              "https://forum.openzeppelin.com/t/create-an-nft-and-deploy-to-a-public-testnet-using-truffle/2961",
            image,
            name,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((e) => {
          console.error("Coud not access nft server: ", e);
          reject(e);
        });
    });
  };

  // eslint-disable-next-line no-unused-vars
  const uploadImagetoIPFS = async () => {
    return new Promise(async (resolve, reject) => {
      var formData = new FormData();

      //pair
      // public:
      // private:

      var identity = EthCrypto.createIdentity();
      var pubKey = identity.publicKey;
      var privKey = identity.privateKey;
      // var idk = new Buffer(pubKey, 'hex');
      var encryptedBase64Image = await encrypt(pubKey, currentFile);
      var decryptedBase64Image = await decrypt(privKey, encryptedBase64Image);
      console.log("Decryped image is: ", decryptedBase64Image);

      console.log("Current file is: ", currentFile);
      console.log("Current filename is: ", fileName);
      // formData.append("file", currentFile);
      // formData.append("fileName", fileName);
      // axios
      //   .post("upload", formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   })
      //   .then((res) => {
      //     console.log("Response from ipfs server is: ", res);
      //     resolve(res);
      //   })
      //   .catch((err) => {
      //     console.error("could not upload to ipfs", err);
      //     reject(err);
      //   });
      formData.append("fileName", fileName);
      formData.append("fileContent", currentFile.split(",")[1]);
      axios
        .post("base64", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("Response from ipfs server is: ", res);
          resolve(res);
        })
        .catch((err) => {
          console.error("could not upload to ipfs", err);
          reject(err);
        });
    });
  };

  const mint = (color) => {
    uploadImagetoIPFS().then((res) => {
      const imageUrl = res.data;
      console.log("The image url is: ", imageUrl);

      getNFTid("Color NFT token", imageUrl, "this definitely has a name!")
        .then((res) => {
          console.log("The nft json server result is: ", res);
          contract.methods
            .mint(color, res.data.id)
            .send({ from: account })
            .once("receipt", (receipt) => {
              console.log("Receipt from minting: ", receipt);

              setColors([...colors, color]);
            })
            .on("error", function (error) {
              alert(
                "There was an error with minting that token, maybe it has already been minted"
              );
              console.error(error);
            });

          loadOwners();
        })
        .catch((e) => {
          console.error(
            "Something went wrong while trying to create nft... ",
            e
          );
        });
    });
  };

  useEffect(() => {
    loadOwners();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors]);

  useEffect(() => {
    async function load() {
      await loadWeb3();
      await loadBlockchainData();
      await loadOwners();
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
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
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  console.log(colorRef.current.value);
                  mint(colorRef.current.value);
                }}
              >
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
          {colors.map((color, key) => {
            return (
              <div key={key} className="col-md-3 mb-3 container">
                <div className="owner box">
                  <b>Owner:</b> {owners[key]}
                </div>
                <div className="token" style={{ backgroundColor: color }}></div>
                <div>{color}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DefaultExample;
