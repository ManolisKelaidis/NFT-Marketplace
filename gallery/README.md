# Getting Started with Gallery Web App - NFT Gallery

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Quick Start

### Metamask Network Set Up
Rinkeby is preconfigured in Metamask.

To set up the new AWS quorum VM with:
1. Open Metamask and go to Settings -> Networks 
1. Click on 'Add Network'
1. On 'Network Name' add a relevant name or whatever you like about the network 
1. On 'New RPC URL' type `http://qrm.plirio.com:22000`
1. On 'Chain ID' type `10`
1. On 'Currency Symbol' add anything other than ETH e.g: `AWS`
1. On 'Block Explorer' you can add `http://qrm.plirio.com:8999/` or leave it empty
1. Click on 'Save'

Troubleshooting:
If the network does not get saved, fill in the fields again and wait for the RPC URL to be verified by Metamask
### Prerequisites:
* Have Ganache installed and running locally ONLY if you want to test things for development (download from: https://www.trufflesuite.com/ganache)
* The project is set up to work with Rinkeby as of 1/6/21 so no need to install ganache 
* Project can be run on quorum VMs added in the truffle-config as well.
* Download truffle and install it globally with `npm install -g truffle`
* Move into the ipfs folder and run the ipfs-test server with `node index.js` or `npm start` 

### Run the app:
1. Move into gallery folder
1. Run `npm i`
1. Run from root `npm run ethereum:compile` or in ethereum folder `npm run truffle:compile` 
1. If you want to issue a new contract move in the ethereum folder and run `npm run truffle:migrate-rinkeby` for rinkeby network
1. Or use `npm run truffle:migrate-AWS` for the new quorum VM network
1. Run `npm start`
1. Once in the nft token page, don't forget to change the Metamask provider to use the desired network.

### To add a new color
1. Write a color in hex including the # prefix
1. Pick an image from your computer
1. Press the Mint button
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
