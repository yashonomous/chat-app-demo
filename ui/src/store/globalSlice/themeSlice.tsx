import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { Theme } from '@primer/react/lib-esm/ThemeProvider';
import { RootState } from '../store';

// Define the initial state using that type
const initialState: Theme = {
  colors: {
    primary: {
      main: '#625ef0',
      light: '#f0effd',
    },
    gray: {
      main: '#a9a9a9',
      light: '#edf2f6',
      bg: '#edf2f6',
    },
    green: {
      light: '#68d491',
    },
    white: '#fff',
    black: '#000',
  },
  // colorSchemes: {
  //   light: {
  //     // colors: {
  //     //   btn: {
  //     //     bg: '#625ef0',
  //     //   },
  //     // },
  //     gray: {
  //       light: '#edf2f6',
  //       bg: '#edf2f6',
  //     },
  //   },
  // },
  radii: {
    xs: '5px',
    sm: '10px',
    md: '20px',
    lg: '30px',
  },
  // fontSizes: {
  //   0: '12px',
  //   1: 14,
  //   2: 16,
  //   3: 24,
  //   4: 32,
  //   5: 48,
  //   6: 64,
  //   7: 96,
  //   8: 128,
  // },
  fontWeights: {
    normal: 400,
    bold: 700,
  },
  fonts: {
    body: 'sans-serif',
    heading: 'sans-serif',
    monospace: 'Menlo, monospace',
  },
};

export const themeSlice = createSlice({
  name: 'themeSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setPrimaryColor: (state, action: PayloadAction<string>) => {
      state.colors = {
        ...state.colors,
        primary: action.payload,
      };
    },
    setSecondaryColor: (state, action: PayloadAction<string>) => {
      state.colors = {
        ...state.colors,
        secondary: action.payload,
      };
    },
  },
});

export const themeSliceActions = themeSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const themeStateSelector = (state: RootState) => state.globalSlice.theme;

export const themeReducer = themeSlice.reducer;

export default themeReducer;
