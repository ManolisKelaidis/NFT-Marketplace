import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import services from "../services";

export const createAsset = createAsyncThunk(
  "asset/createAsset",
  async (data, { rejectWithValue }) => {
    try {
      const response = await services.AssetService.createAsset(data);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const retrieveAssets = createAsyncThunk(
  "asset/retrieveAssets",
  async (params, { rejectWithValue }) => {
    try {
      const response = await services.AssetService.retrieveAssets(params);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const retrieveAsset = createAsyncThunk(
  "asset/retrieveAsset",
  async ({ assetId }, { rejectWithValue }) => {
    try {
      const response = await services.AssetService.retrieveAsset(assetId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteAsset = createAsyncThunk(
  "asset/deleteAsset",
  async ({ assetId }, { rejectWithValue }) => {
    try {
      const response = await services.AssetService.deleteAsset(assetId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateAsset = createAsyncThunk(
  "asset/updateAsset",
  async ({ assetId, data }, { rejectWithValue }) => {
    try {
      const response = await services.AssetService.updateAsset(assetId, data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

let initialState = {
  state: "",
  error: {},
};

const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {},
  extraReducers: {
    /* ---- CREATE_ASSET---- */
    [String(createAsset.pending)]: (state, action) => {
      state.state = "loading";
    },
    [String(createAsset.fulfilled)]: (state, action) => {
      state.state = "success";
    },
    [String(createAsset.rejected)]: (state, action) => {
      state.state = "error";
      state.error = action.payload;
    },

    /* ---- GET_ASSETS ---- */
    [String(retrieveAssets.pending)]: (state, action) => {
      state.state = "loading";
    },
    [String(retrieveAssets.fulfilled)]: (state, action) => {
      state.state = "success";
    },
    [String(retrieveAssets.rejected)]: (state, action) => {
      state.state = "error";
      state.error = action.payload;
    },

    /* ---- GET_ASSET ---- */
    [String(retrieveAsset.pending)]: (state, action) => {
      state.state = "loading";
    },
    [String(retrieveAsset.fulfilled)]: (state, action) => {
      state.state = "success";
    },
    [String(retrieveAssets.rejected)]: (state, action) => {
      state.state = "error";
      state.error = action.payload;
    },

    /* ---- UPDATE_ASSET---- */
    [String(updateAsset.pending)]: (state, action) => {
      state.state = "loading";
    },
    [String(updateAsset.fulfilled)]: (state, action) => {
      state.state = "success";
    },
    [String(updateAsset.rejected)]: (state, action) => {
      state.state = "error";
      state.error = action.payload;
    },

    /* ---- DELETE_ASSET ---- */
    [String(deleteAsset.pending)]: (state, action) => {
      state.state = "loading";
    },
    [String(deleteAsset.fulfilled)]: (state, action) => {
      state.state = "success";
    },
    [String(deleteAsset.rejected)]: (state, action) => {
      state.state = "error";
      state.error = action.payload;
    },
  },
});

export const {} = assetSlice.actions;

export default assetSlice.reducer;
