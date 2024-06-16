import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import themeReducer from './themeSlice';

const globalReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
});

export default globalReducer;
