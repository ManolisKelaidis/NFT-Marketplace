import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import services from "../services";

export const createCollection = createAsyncThunk(
  "collection/createCollection",
  async (data , { rejectWithValue }) => {
    try {
      const response = await services.CollectionService.createCollection( data );

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const retrieveCollections = createAsyncThunk(
  "collection/retrieveCollections",
  async (params, { rejectWithValue }) => {
    try {
      const response = await services.CollectionService.retrieveCollections(params);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const retrieveCollection = createAsyncThunk(
  "collection/retrieveCollection",
  async (collectionId, { rejectWithValue }) => {
    try {
      const response = await services.CollectionService.retrieveCollection(collectionId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCollection = createAsyncThunk(
  "collection/deleteCollection",
  async (collectionId, { rejectWithValue }) => {
    try {
      const response = await services.CollectionService.deleteCollection(collectionId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateCollection = createAsyncThunk(
  "collection/updateCollection",
  async ({collectionId,info},{ rejectWithValue }) => {
    try {
      const response = await services.CollectionService.updateCollection(collectionId,info);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

let initialState = {
  state: "",
  form:{
    username:"",
    password:"",
    email:"",
  },
  value:"",
  error: {},
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    DUMMY(){},
  },
  extraReducers: {
    /* ---- CREATE_USER ---- */
    [String(createCollection.pending)]: (state, action) => {
      state.state = "loading";
    },
    [String(createCollection.fulfilled)]: (state, action) => {
      state.state = "success";
    },
    [String(createCollection.rejected)]: (state, action) => {
      state.state = "error";
      state.error = action.payload;
    },

    /* ---- GET_USERS ---- */
    [String(retrieveCollections.pending)]: (state, action) => {
      state.state = "loading";
    },
    [String(retrieveCollections.fulfilled)]: (state, action) => {
      state.state = "success";
    },
    [String(retrieveCollections.rejected)]: (state, action) => {
      state.state = "error";
      state.error = action.payload;
    },

    /* ---- GET_USER ---- */
    [String(retrieveCollection.pending)]: (state, action) => {
        state.state = "loading";
      },
      [String(retrieveCollection.fulfilled)]: (state, action) => {
        state.state = "success";
      },
      [String(retrieveCollection.rejected)]: (state, action) => {
        state.state = "error";
        state.error = action.payload;
      },

      /* ---- UPDATE_USER ---- */
    [String(updateCollection.pending)]: (state, action) => {
        state.state = "loading";
      },
      [String(updateCollection.fulfilled)]: (state, action) => {
        state.state = "success";
      },
      [String(updateCollection.rejected)]: (state, action) => {
        state.state = "error";
        state.error = action.payload;
      },

       /* ---- DELETE_USER ---- */
    [String(deleteCollection.pending)]: (state, action) => {
        state.state = "loading";
      },
      [String(deleteCollection.fulfilled)]: (state, action) => {
        state.state = "success";
      },
      [String(deleteCollection.rejected)]: (state, action) => {
        state.state = "error";
        state.error = action.payload;
      },
      
  },
});

export const {DUMMY} = collectionSlice.actions;

export default collectionSlice.reducer;
