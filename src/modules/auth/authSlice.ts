import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  profile: {
    _id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    status?: string;
    role?: string;
  } | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  profile: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        profile: AuthState["profile"];
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.profile = action.payload.profile;
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.profile = null;
    },
  },
});



export const { setAuth, clearAuth } = authSlice.actions;

export default authSlice.reducer;
