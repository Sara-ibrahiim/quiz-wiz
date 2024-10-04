import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../modules/theme/themeSlice";
import authReducer from "../modules/auth/authSlice";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
