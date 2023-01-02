import { createSlice } from "@reduxjs/toolkit";

const AuthState = {
  user: {
    fbID: null,
    email: null,
    accessToken: null,
    provider: null,
  },
  loggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: AuthState,
  reducers: {
    setAuth: (state, action) => {
      state.user = { ...action.payload };
      state.loggedIn = true;
      localStorage.setItem("SESSION", true);
    },
    resetAuth: (state) => {
      state.user = { ...AuthState.user };
      state.loggedIn = false;
      localStorage.removeItem("SESSION");
    },
    updateEmail: (state, action) => {
      state.user.email = action.payload;
    },
  },
});

export const { setAuth, resetAuth, updateEmail } = authSlice.actions;

export default authSlice.reducer;
