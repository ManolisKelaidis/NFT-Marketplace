import { combineReducers, configureStore } from "@reduxjs/toolkit";

import ethereumReducer from "./EthereumSlice";
import userReducer from "./UserSlice";
import collectionReducer from "./CollectionSlice";
import assetReducer from "./AssetSlice"
import bidReducer from "./BidSlice"
import authReducer from "./AuthSlice"

const reducer = combineReducers({
  ethereum: ethereumReducer,
  user: userReducer,
  collection: collectionReducer,
  asset:assetReducer,
  bid:bidReducer,
  auth:authReducer
});

const rootReducer = (state, action) => {
  if (action.type === "store/reset") {
    state = undefined;
  }
  return reducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
