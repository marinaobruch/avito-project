import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRequestAds } from "interface/api-interface";

export interface IAdsSlice {
    allAds: IRequestAds[];
    currentAd: null;
  }

const initialState: IAdsSlice = {
    allAds: [],
    currentAd: null,
};

export const adsSlice = createSlice({
  name: "ads",
  initialState: initialState,

  reducers: {
    getAllAds (state, action: PayloadAction<IRequestAds[]>) {
      const payload = action.payload ?? initialState;

      state.allAds = payload;
    },

  },
});

export const { getAllAds } = adsSlice.actions;