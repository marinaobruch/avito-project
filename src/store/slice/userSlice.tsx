import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserRequest } from "interface/api-interface";

interface IUserSlice {
  email: string;
  allUsers: IUserRequest[];
  userData: IUserRequest;
}

const initialState: IUserSlice = {
    email: '',
    allUsers: [],
    userData: {
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

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,

  reducers: {
    setAllUser (state, action: PayloadAction<IUserRequest[]>) {
      const payload = action.payload ?? initialState;
      state.allUsers = payload;
    },

    setUser (state, action: PayloadAction<IUserSlice>) {
      const payload = action.payload ?? initialState;
      state.email = payload.email;
    },

    setUserData (state, action: PayloadAction<IUserRequest>) {
      const payload = action.payload ?? initialState;
      state.userData = payload;
    },

    removeUser (state) {
      state.email = '';
      state.allUsers = [];
      state.userData = {
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
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('access_token');
    },
  },
});

export const { setAllUser, setUser, setUserData, removeUser } = userSlice.actions;