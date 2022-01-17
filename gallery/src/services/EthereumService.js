import Web3 from "web3";
import axios from "axios";
import EthCrypto from "eth-crypto";

import { encrypt, decrypt } from "../helpers/crypto";
import Color from "../abis/Color.json";

axios.defaults.baseURL = "http://localhost:3001";

const plirio = axios.create({
  baseURL: "https://nfts.plirio.com",
});

export default class EthereumService {
  async loadWeb3() {
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async retrieveBlockchainData() {
    try {
      let account = {},
        contract = {},
        colors = [];

      const web3 = window.web3;
      // Load accounts exposed by Metamask
      const accounts = await web3.eth.getAccounts();
      account = accounts[0];
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
        contract = new web3.eth.Contract(abi, address);
        const totalSupply = await contract.methods.totalSupply().call();
        // setTotalSupply(totalSupply);
        // Load Colors
        for (var i = 0; i < totalSupply; i++) {
          let color = await contract.methods.colors(i).call();
          colors.push(color);
        }
      } else {
        throw new Error("Smart contract not deployed to detected network.");
      }

      return {
        account,
        contract,
        colors,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async retrieveOwners(colors, contract) {
    const owners = [];
    for (const color of colors) {
      let owner = await contract.methods.ownerOfColor(color).call();
      owners.push(owner);
    }
    return { owners };
  }

  async uploadImagetoIPFS(file, fileName) {
    try {
      var formData = new FormData();

      //pair
      // public:
      // private:

      var identity = EthCrypto.createIdentity();
      var pubKey = identity.publicKey;
      var privKey = identity.privateKey;
      // var idk = new Buffer(pubKey, 'hex');
      var encryptedBase64Image = await encrypt(pubKey, file);
      var decryptedBase64Image = await decrypt(privKey, encryptedBase64Image);
      console.log("Decryped image is: ", decryptedBase64Image);

      console.log("Current file is: ", file);
      console.log("Current filename is: ", fileName);

      formData.append("fileName", fileName);
      formData.append("fileContent", file.split(",")[1]);

      const response = await axios.post("base64", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response from ipfs server is: ", response);

      return response;
    } catch (error) {
      console.error("could not upload to ipfs", error);
      return Promise.reject(error);
    }
  }

  async retrieveNFTid(description, image, name) {
    return new Promise((resolve, reject) => {
      plirio
        .post(
          "nfts",
          {
            description,
            image,
            name,
            external_url:
              "https://forum.openzeppelin.com/t/create-an-nft-and-deploy-to-a-public-testnet-using-truffle/2961",
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
  }
}
