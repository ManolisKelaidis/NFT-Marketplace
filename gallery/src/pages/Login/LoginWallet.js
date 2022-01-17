import Web3 from "web3";
import { Button, Image } from "react-bootstrap";
import React from "react";
import FormikForm from "./../../components/form/FormikForm";
import { useTranslation } from "react-i18next";

import metamask from "../../assets/img/metamask.png";
import { useEffect, useState } from "react";
import { getAccountPath } from "ethers/lib/utils";

const formModel = {
  address: "",
};

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
const LoginWallet = () => {
  const { t } = useTranslation();
  const [account, setAccount] = useState("");
  const [balance, Setbalance] = useState(0);
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);

  const onLoad = async () => {
    window.web3 = new Web3(window.ethereum);
    if (window.ethereum) {
      console.log("hello");
      setIsWalletInstalled(true);
      console.log("web3 is enabled");
    } else {
      console.log("web3 is not found");
    }
  };
  const connectWallet = async () => {
    if (window.ethereum) {
      const connectedAddress = await window.ethereum.enable();
      setAccount(connectedAddress[0]);
      console.log(connectedAddress);
      var balance = await window.web3.eth.getBalance(connectedAddress[0]); //Will give value in.

      Setbalance(balance);
      console.log(balance);

      handleSignMessage({
        publicAddress: connectedAddress[0],
        nonce: "hard_to_guess",
      }).then((signature) => {
        console.log("This is not safe: ", signature);
      });

      // console.log(window.ethereum)
      // window.ethereum.on("connect", (handler) => {

      //   console.log("asdasd")
      //   // able to send requests
      //   // not sure when this triggers
      //   console.log(handler);
      // });
      // window.ethereum.on("disconnect", (handler) => {
      //   console.log("Metamask disconnected");
      //   // usefull for detecting network or other errors
      // });

      // window.ethereum.on("accountsChanged", (accounts) => {
      //   console.log("Account has been selected: ", accounts);
      //   // when metamask is logged out this event is also triggered and it returns an empty array
      //   setAccount(accounts[0]);
      // });

      // window.ethereum.on("chainChanged", (chainId) => {
      //   // Handle the new chain.
      //   // Correctly handling chain changes can be complicated.
      //   // We recommend reloading the page unless you have good reason not to.
      //   console.log("Chain has been changed to: ", chainId);
      //   // window.location.reload();
      // });
    } else if (window.web3) {
      console.log("asdasd");
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };
  useEffect(() => {
    onLoad();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(account);

  return (
    <div>
      {isWalletInstalled ? (
        <div className="sign">
          <div className="sign__content">
            {account ? (
              <div>
                <h3 className="text-primary">Connected with : {account}</h3>{" "}
                <br></br>
                <h3 className="text-primary">
                  your balance in ETH is : {balance}
                </h3>
              </div>
            ) : (
              <FormikForm initialValues={formModel}>
                <div className="main__title main__title--center">
                  <h3>You need a crypto wallet to continue using NFTart</h3>
                </div>

                <Image src={metamask}></Image>

                <Button
                  block
                  variant="primary"
                  size="lg"
                  type="submit"
                  className="sign__btn"
                  onClick={() => {
                    connectWallet();
                  }}
                >
                  {t("login-page.connect")}
                </Button>
              </FormikForm>
            )}
          </div>
        </div>
      ) : (
        <div className="sign">
          <div className="sign__content">
            <FormikForm initialValues={formModel}>
              <div className="main__title main__title--center">
                <h3>You need to install MetaMask to continue</h3>
              </div>

              <Image src={metamask}></Image>

              <Button
                block
                href="https://metamask.io/download"
                text="Get Metamask"
                variant="primary"
                size="lg"
                type="submit"
                className="sign__btn"
                onClick={() => {}}
              >
                {t("login-page.download-metamask")}
              </Button>
            </FormikForm>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginWallet;
