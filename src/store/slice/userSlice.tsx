import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "interface/api-interface";

const initialState: IUser = {
    id: null,
    name: null,
    email: null,
    city: null,
    avatar: null,
    sells_from: null,
    phone: null,
    role: null,
    surname: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,

  reducers: {
    setUser (state, action: PayloadAction<IUser>) {
      const payload = action.payload ?? initialState;

      state.id = payload.id;
      state.email = payload.email;
      state.name = payload.name;
      state.surname = payload.surname;
      state.city = payload.city;
    },

    removeUser (state) {
      state.id = null;
      state.email = null;
      state.name = null;
      state.surname = null;
      state.city = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;