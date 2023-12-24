import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRequestAds } from "interface/api-interface";

export interface IAdsSlice {
    allAds: IRequestAds[];
    selected_ad: string;
  }

const initialState: IAdsSlice = {
    allAds: [],
    selected_ad: '',
};

export const adsSlice = createSlice({
  name: "ads",
  initialState: initialState,

  reducers: {
    getAllAds (state, action: PayloadAction<IRequestAds[]>) {
      const payload = action.payload ?? initialState;
      state.allAds = payload;
    },

    setSelectedAdd: (state, action) => {
      state.selected_ad = action.payload
    },

  },
});

export const { getAllAds } = adsSlice.actions;