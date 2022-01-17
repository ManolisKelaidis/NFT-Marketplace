import Web3 from "web3";
let ethereum;

export default class EthereumService {

    // or should we expose ethereum variable?
    loadWeb3 = async () => {
        if (window.ethereum) {
            ethereum = window.ethereum;
            console.log('[Ethereum Service]: Metamask is installed');
            window.web3 = new Web3(window.ethereum);

            // if account is not selected this will prompt the user to select an account 
            await window.ethereum.enable().then(async (activeAccount) => {
                console.log("[Ethereum Service]: Ethereum enabled with active account: ", activeAccount);

                if (typeof activeAccount === 'object') {
                    activeAccount = activeAccount[0];
                }

                // this should happen only the first time during registration and after that it will be verified on the background
                handleSignMessage({ publicAddress: activeAccount, nonce: 'hard_to_guess' }).then(signature => {
                    console.log('This is not safe: ', signature);
                });
            });

            ethereum.on('connect', (handler) => {
                // able to send requests
                // not sure when this triggers
                console.log('Metamask connected to rpc network');
            });

            ethereum.on('disconnect', (handler) => {
                console.log('Metamask disconnected');
                // usefull for detecting network or other errors
            });

            ethereum.on('accountsChanged', (accounts) => {
                console.log('Account has been selected: ', accounts);
                // when metamask is logged out we get empty array
                // should probably set the new account
                handleSignMessage({ publicAddress: accounts[0], nonce: 'nonce_here' }).then((signature) => {
                    console.log('Signature: ', signature);
                });
                // check if the bc account is registered in the platform
                // if yes load the corresponding page if not create an account for them
            });

            ethereum.on('chainChanged', (chainId) => {
                // Handle the new chain.
                // Correctly handling chain changes can be complicated.
                console.log('Chain has been changed to: ', chainId);
                // We recommend reloading the page unless you have good reason not to.
                window.location.reload();
            });
        } else {
            window.alert(
                "Please install Metamask to continue"
            );
        }
        
        const handleSignMessage = ({ publicAddress, nonce }) => {
            const web3 = window.web3;
            console.log('Account in handeSignMessage: ', publicAddress);

            return new Promise((resolve, reject) => {

                web3.eth.personal.sign(
                    `Sign this message to prove you have access to this wallet and we\'ll log you in. This won\'t cost Ether. \n\n To stop hackers from hacking keep this unique ID message they can\'t guess ${nonce}`,
                    publicAddress
                ).then((signature) => resolve(signature))
                    .catch(e => { reject(e) });

            });
        }

    };
}