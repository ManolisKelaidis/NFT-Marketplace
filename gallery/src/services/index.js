import EthereumService from "./EthereumService";
import UserService from "./UserService";
import CollectionService from './CollectionService';
import AssetService from "./AssetService"
import BidService from "./BidService" 

const services = {
  EthereumService: new EthereumService(),
  UserService: new UserService(),
  AssetService: new AssetService(),
  BidService: new BidService(),
  CollectionService: new CollectionService()

};

export default services;
