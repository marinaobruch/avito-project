import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserSlice {
  email: string;
}

const initialState: IUserSlice = {
    email: '',
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,

  reducers: {
    setUser (state, action: PayloadAction<IUserSlice>) {
      const payload = action.payload ?? initialState;
      state.email = payload.email;
    },

    removeUser (state) {
      state.email = '';
      localStorage.removeItem('refresh_token');
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;