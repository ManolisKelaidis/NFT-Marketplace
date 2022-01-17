# Ethereum - NFT Gallery - Truffle & Contracts

Using node version: 14.17.0
## Initialize truffle project
1. Install truffle with `npm install -g truffle`
1. Move into the ethereum directory
1. Run `truffle compile`
1. Create a `secrets.json` file and add your mnemonic and infura projectId (check secrets.template.json). 

        You can use as a projectID: 30fb4282fc094c04a7667ce973793c48
## Truffle Commands
* To compile all contracts in the contracts folder run in the ethereum directory `truffle compile`
* To perform all automations/contract deployments run `truffle migrate`
    * To run specific migrations run `truffle migrate -f N` where N is the id-number of the migration you want to run
    * To reset a deployed contracts address in the abis when changes have occured run `truffle migrate --reset`
* To run migrations on a specific network run `truffle migrate --network netName` where netName is rinkeby or develop
* If you want to test on develop network have Ganache installed and running locally (download from: https://www.trufflesuite.com/ganache)


## Quick Start (recomended that you install truffle globaly)
Right now the project is set up to work with rinkeby. So to get started right away:
1. Run the commands in the *Initialize truffle project* section
1. Run `truffle migrate -f 3 --network rinkeby`