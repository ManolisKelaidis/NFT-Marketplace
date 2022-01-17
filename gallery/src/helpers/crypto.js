import EthCrypto from "eth-crypto";

export const encrypt = async (publicKey, data) => {
  try {
    console.log("unencrypted string: ", data);
    console.log("key ", publicKey);

    // const base64string = arrayBufferToBase64(data);
    // const stringifiedData = JSON.stringify(data);
    const enc = await EthCrypto.encryptWithPublicKey(publicKey, data);
    const encryptedString = EthCrypto.cipher.stringify(enc);
    console.log("Encrypted image, ", encryptedString);

    return encryptedString;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const decrypt = async (privateKey, encryptedData) => {
  try {
    const encryptedObject = EthCrypto.cipher.parse(encryptedData);
    const dec = await EthCrypto.decryptWithPrivateKey(
      privateKey,
      encryptedObject
    );
    // return Promise.resolve('data:image/jpeg;base64,' + dec);

    return dec;
  } catch (error) {
    return Promise.reject(error);
  }
};
