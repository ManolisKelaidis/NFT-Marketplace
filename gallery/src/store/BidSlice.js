import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import services from "../services";

export const createBid = createAsyncThunk(
  "bid/createBid",
  async (data, { rejectWithValue }) => {
    try {
      const response = await services.BidService.createBid(data);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const retrieveBids = createAsyncThunk(
  "bid/retrieveBids",
  async (params, { rejectWithValue }) => {
    try {
      const response = await services.BidService.retrieveBids(params);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const retrieveBid = createAsyncThunk(
  "bid/retrieveBid",
  async ({ assetId }, { rejectWithValue }) => {
    try {
      const response = await services.BidService.retrieveBid(assetId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteBid = createAsyncThunk(
  "bid/deleteBid",
  async ({ bidId }, { rejectWithValue }) => {
    try {
      console.log({ bidId });
      const response = await services.BidService.deleteBid(bidId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateBid = createAsyncThunk(
  "bid/updateBid",
  async ({ bidId, data }, { rejectWithValue }) => {
    try {
      console.log({ bidId });
      console.log(data);

      const response = await services.BidService.updateBid(bidId, data);
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

const bidSlice = createSlice({
  name: "bid",
  initialState,
  reducers: {},
  extraReducers: {
    /* ---- CREATE_BID---- */
    [String(createBid.pending)]: (state, action) => {
      state.state = "loading";
    },
    [String(createBid.fulfilled)]: (state, action) => {
      state.state = "success";
    },
    [String(createBid.rejected)]: (state, action) => {
      state.state = "error";
      state.error = action.payload;
    },

    /* ---- GET_BIDS ---- */
    [String(retrieveBids.pending)]: (state, action) => {
      state.state = "loading";
    },
    [String(retrieveBids.fulfilled)]: (state, action) => {
      state.state = "success";
    },
    [String(retrieveBids.rejected)]: (state, action) => {
      state.state = "error";
      state.error = action.payload;
    },

    /* ---- GET_BID ---- */
    [String(retrieveBid.pending)]: (state, action) => {
      state.state = "loading";
    },
    [String(retrieveBid.fulfilled)]: (state, action) => {
      state.state = "success";
    },
    [String(retrieveBid.rejected)]: (state, action) => {
      state.state = "error";
      state.error = action.payload;
    },

    /* ---- UPDATE_ASSET---- */
    [String(updateBid.pending)]: (state, action) => {
      state.state = "loading";
    },
    [String(updateBid.fulfilled)]: (state, action) => {
      state.state = "success";
    },
    [String(updateBid.rejected)]: (state, action) => {
      state.state = "error";
      state.error = action.payload;
    },

    /* ---- DELETE_BID ---- */
    [String(deleteBid.pending)]: (state, action) => {
      state.state = "loading";
    },
    [String(deleteBid.fulfilled)]: (state, action) => {
      state.state = "success";
    },
    [String(deleteBid.rejected)]: (state, action) => {
      state.state = "error";
      state.error = action.payload;
    },
  },
});

export const {} = bidSlice.actions;

export default bidSlice.reducer;
