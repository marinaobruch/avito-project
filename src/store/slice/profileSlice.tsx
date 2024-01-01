import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserRequest } from "interface/api-interface";

interface IProfileSlice {
    choisenUser: IUserRequest;
}

const initialState: IProfileSlice = {
    choisenUser: {
      id: 0,
      name: '',
      email: '',
      city: '',
      avatar: '',
      sells_from: '',
      phone: '',
      role: '',
      surname: '',
  },
};

export const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,

  reducers: {
    choiseUser (state, action: PayloadAction<IUserRequest>) {
        const payload = action.payload ?? initialState;
        state.choisenUser = payload;
    },
  },
});

export const { choiseUser } = profileSlice.actions;