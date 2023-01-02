import { configureStore } from "@reduxjs/toolkit";

// Reducers
import authReducer from "./auth/auth.reducer";
import userReducer from "./user/user.reducer";

// Redux Store
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  },
  devTools: process.env.NODE_ENV === "development",
});

export default store;
