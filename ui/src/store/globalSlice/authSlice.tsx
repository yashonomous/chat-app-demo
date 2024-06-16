import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

interface IUser {
  id: string | number;
  name: string;
  email: string;
  avatar?: string;
}

interface IAuthState {
  token: string;
  isAuthenticated: boolean;
  loading: boolean;
  error: string;
  user: IUser | null;
}

// Define the initial state using that type
const initialState: IAuthState = {
  token: 'someToken',
  isAuthenticated: true,
  loading: false,
  error: '',
  user: null,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const authSliceActions = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const authStateSelector = (state: RootState) => state.globalSlice.auth;

export const authReducer = authSlice.reducer;

export default authReducer;
