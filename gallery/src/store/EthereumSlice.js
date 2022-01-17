import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import services from "../services";

export const loadWeb3 = createAsyncThunk(
  "ethereum/loadWeb3",
  async ({ ...props }, { rejectWithValue }) => {
    try {
      const response = await services.EthereumService.loadWeb3();

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const retrieveBlockchainData = createAsyncThunk(
  "ethereum/retrieveBlockchainData",
  async ({ ...props }, { rejectWithValue }) => {
    try {
      const response = await services.EthereumService.retrieveBlockchainData();

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const retrieveOwners = createAsyncThunk(
  "ethereum/retrieveOwners",
  async ({ ...props }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { colors, contract } = state.ethereum;
      const response = await services.EthereumService.retrieveOwners(
        colors,
        contract
      );

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createNFT = createAsyncThunk(
  "ethereum/createNFT",
  async ({ color, file, fileName }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const { account, contract, colors } = state.ethereum;
      let newColorList = [];

      const imageUploadResponse =
        await services.EthereumService.uploadImagetoIPFS(file, fileName);
      const imageUrl = imageUploadResponse.data;
      console.log("The image url is: ", imageUrl);

      const nftIdResponse = await services.EthereumService.retrieveNFTid(
        "Color NFT token",
        imageUrl,
        "this definitely has a name!"
      );
      console.log("The nft json server result is: ", nftIdResponse);

      await contract.methods
        .mint(color, nftIdResponse.data.id)
        .send({ from: account })
        .once("receipt", (receipt) => {
          console.log("Receipt from minting: ", receipt);
          newColorList = [...colors, color];
        })
        .on("error", function (error) {
          console.error(error);
          throw new Error(error);
        });

      return { colors: newColorList };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

let initialState = {
  account: {},
  contract: {},
  colors: [],
  owners: [],
  initialized: false,
  state: "",
  error: {},
};

const ethereumSlice = createSlice({
  name: "ethereum",
  initialState,
  reducers: {
    SET_INITIALIZED(state, action) {
      const { initialized } = action.payload;
      state.initialized = initialized;
    },
  },
  extraReducers: {
    /* ---- LOAD_WEB_3 ---- */
    [String(loadWeb3.pending)]: (state, action) => {
      state.state = "loading";
    },
    [String(loadWeb3.fulfilled)]: (state, action) => {
      state.state = "success";
    },
    [String(loadWeb3.rejected)]: (state, action) => {
      state.state = "error";
      state.error = action.payload;
    },
    /* ---- RETRIEVE_BLOCKCHAIN_DATA ---- */
    [String(retrieveBlockchainData.pending)]: (state, action) => {
      state.state = "loading";
    },
    [String(retrieveBlockchainData.fulfilled)]: (state, action) => {
      state.state = "success";
      state.account = action.payload.account;
      state.contract = action.payload.contract;
      state.colors = action.payload.colors;
    },
    [String(retrieveBlockchainData.rejected)]: (state, action) => {
      state.state = "error";
      state.error = action.payload;
      state.account = {};
      state.contract = {};
      state.colors = [];
    },
    /* ---- RETRIEVE_OWNERS ---- */
    [String(retrieveOwners.pending)]: (state, action) => {
      state.state = "loading";
    },
    [String(retrieveOwners.fulfilled)]: (state, action) => {
      state.state = "success";
      state.owners = action.payload.owners;
    },
    [String(retrieveOwners.rejected)]: (state, action) => {
      state.state = "error";
      state.error = action.payload;
      state.owners = [];
    },
    /* ---- CREATE_NFT ---- */
    [String(createNFT.pending)]: (state, action) => {
      state.state = "loading";
    },
    [String(createNFT.fulfilled)]: (state, action) => {
      state.state = "success";
      state.colors = action.payload.colors;
    },
    [String(createNFT.rejected)]: (state, action) => {
      state.state = "error";
      state.error = action.payload;
    },
  },
});

export const { SET_INITIALIZED } = ethereumSlice.actions;

export default ethereumSlice.reducer;
