import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import authReducer from "./authSlice";
import groupsReducer from "./groupSlice";
import studentsReducer from "./studentSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    groups: groupsReducer,
    students: studentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
