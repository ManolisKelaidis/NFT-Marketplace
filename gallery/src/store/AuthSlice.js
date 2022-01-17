import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import services from "../services";
import { setAuthToken } from "../helpers/auth";
var jwt = require("jsonwebtoken");

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!")
      const response = await services.UserService.loginUser({
        email,
        password,
      });
      console.log(response)
      return response;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error);
    }
  }
);

let initialState = {
  state: "",
  isAuthorized: false,
  userId: "",
  isSetUp: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGOUT_USER(state) {
      state.isAuthorized = false;
      state.userId = "";
      state.isSetUp = false;
      setAuthToken(null);
    },
  },
  extraReducers: {
    /* ---- LOGIN_USER ---- */
    [String(loginUser.pending)]: (state, action) => {
      state.state = "pending";
    },
    [String(loginUser.fulfilled)]: (state, action) => {
      const data = action.payload.body.data;
      const decodedToken = jwt.verify(data.token, "weriu34sdmkd326842lfjewrmekoifrqwei");
      setAuthToken(`Bearer ${data.token}`);
      console.log(decodedToken.user.id)
      state.userId = decodedToken.user.id;
      state.isAuthorized = true;
      state.isSetUp = false;
      state.state = "success";
    },
    [String(loginUser.rejected)]: (state, action) => {
      state.state = "error";
    },
  },
});

export const { LOGOUT_USER } = authSlice.actions;

export default authSlice.reducer;
