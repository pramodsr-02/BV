import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import signupReducer from "../features/signupSlice";
import userReducer from "../features/userSlice";
import profilesReducer from "../features/profilesSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    signup: signupReducer,
    user: userReducer,
    profiles: profilesReducer
  },
  devTools: process.env.NODE_ENV !== "production"
});
