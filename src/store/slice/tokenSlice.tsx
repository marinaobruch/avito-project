import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IToken } from "interface/api-interface";


const initialState: IToken = {
    access_token: '',
    refresh_token: ''
};

export const tokenSlice = createSlice({
  name: "token",
  initialState: initialState,

  reducers: {
    setAccessToken (state, action: PayloadAction<string>) {
      const payload = action.payload ?? initialState;
      state.access_token = payload;
    },
    setRefreshToken (state, action: PayloadAction<string>) {
        const payload = action.payload ?? initialState;
        state.refresh_token = payload;
      },
      clearTokens(state) {
        state.access_token = ''
        state.refresh_token = ''
      },
  },
});

export const { setAccessToken, setRefreshToken, clearTokens } = tokenSlice.actions;