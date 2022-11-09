import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { setMessage } from "./messageSlice";
import { auth } from "../services/firebase";
import {
  createUser,
  loginUser,
  logoutUser,
  onAuthStateChange,
} from "../services/firebase";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { dispatch }) => {
    const { email, password, name } = payload;
    try {
      const user = await createUser(email, password, name);
      dispatch(setMessage({ message: "User registered successfully" }));
      return user;
    } catch (error) {
      dispatch(setMessage({ message: error.message, error: true }));
      return error;
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",
  async (payload, { dispatch }) => {
    const { email, password } = payload;
    try {
      const user = await loginUser(email, password);
      dispatch(setMessage({ message: "User logged in successfully" }));
      return user;
    } catch (error) {
      dispatch(setMessage({ message: error.message, error: true }));
      return error;
    }
  }
);

export const logoutUserThunk = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    try {
      await logoutUser();
      dispatch(setMessage({ message: "User logged out successfully" }));
    } catch (error) {
      dispatch(setMessage({ message: error.message, error: true }));
      return error;
    }
  }
);

export const trackAuthState = createAsyncThunk(
  "auth/trackAuthState",
  async (_, { dispatch }) => {
    try {
      const user = await onAuthStateChange();
      return user;
    } catch (error) {
      dispatch(setMessage({ message: error.message, error: true }));
      return error;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extractRehydrationInfo: (action) => {
    if (action.type === HYDRATE) {
      return action.payload.auth;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logoutUserThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(trackAuthState.pending, (state) => {
        state.status = "loading";
      })
      .addCase(trackAuthState.fulfilled, (state) => {
        state.status = "";
      })
      .addCase(trackAuthState.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      });
  },
});

export const { setUser } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectStatus = (state) => state.auth.status;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
