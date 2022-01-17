import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import services from "../services";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await services.UserService.loginUser(data);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createUser = createAsyncThunk(
  "user/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await services.UserService.createUser(data);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const retrieveUsers = createAsyncThunk(
  "user/retrieveUsers",
  async (params, { rejectWithValue }) => {
    try {
      const response = await services.UserService.retrieveUsers(params);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const retrieveUser = createAsyncThunk(
  "user/retrieveUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await services.UserService.retrieveUser(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await services.UserService.deleteUser(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ userId, info }, { rejectWithValue }) => {
    try {
      const response = await services.UserService.updateUser(userId, info);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

let initialState = {
  currentUser: null,
  state: "",
  form: {
    username: "",
    password: "",
    email: "",
  },
  value: "",
  error: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SET_REGISTRATION_FORM(state, action) {
      const form = action.payload;
      state.form.username = form.name;
      state.form.email = form.email;
    },
  },
  extraReducers: {
    /* ---- CREATE_USER ---- */
    [String(createUser.pending)]: (state, action) => {
      state.state = "loading";
    },
    [String(createUser.fulfilled)]: (state, action) => {
      state.state = "success";
    },
    [String(createUser.rejected)]: (state, action) => {
      state.state = "error";
      state.error = action.payload;
    },

    /* ---- GET_USERS ---- */
    [String(retrieveUsers.pending)]: (state, action) => {
      state.state = "loading";
    },
    [String(retrieveUsers.fulfilled)]: (state, action) => {
     
      state.state = "success";
    },
    [String(retrieveUsers.rejected)]: (state, action) => {
      state.state = "error";
      state.error = action.payload;
    },

    /* ---- GET_USER ---- */
    [String(retrieveUser.pending)]: (state, action) => {
      state.state = "loading";
    },
    [String(retrieveUser.fulfilled)]: (state, action) => {
      state.currentUser = action.payload.body.data;
      state.state = "success";
    },
    [String(retrieveUser.rejected)]: (state, action) => {
      state.state = "error";
      state.error = action.payload;
    },

    /* ---- UPDATE_USER ---- */
    [String(updateUser.pending)]: (state, action) => {
      state.state = "loading";
    },
    [String(updateUser.fulfilled)]: (state, action) => {
      state.state = "success";
    },
    [String(updateUser.rejected)]: (state, action) => {
      state.state = "error";
      state.error = action.payload;
    },

    /* ---- DELETE_USER ---- */
    [String(deleteUser.pending)]: (state, action) => {
      state.state = "loading";
    },
    [String(deleteUser.fulfilled)]: (state, action) => {
      state.state = "success";
    },
    [String(deleteUser.rejected)]: (state, action) => {
      state.state = "error";
      state.error = action.payload;
    },
  },
});

export const { SET_REGISTRATION_FORM } = userSlice.actions;

export default userSlice.reducer;
