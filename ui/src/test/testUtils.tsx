import { ThemeProvider, theme } from '@primer/react';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import deepmerge from 'deepmerge';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { AppStore, RootState, setupStore } from '../store/store';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export const initialMockStoreState = {
  globalSlice: {
    theme: {
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
      radii: {
        xs: '5px',
        sm: '10px',
        md: '20px',
        lg: '30px',
      },
      fontWeights: {
        normal: 400,
        bold: 700,
      },
      fonts: {
        body: 'sans-serif',
        heading: 'sans-serif',
        monospace: 'Menlo, monospace',
      },
    },
    auth: {
      token: 'someToken',
      isAuthenticated: true,
      loading: false,
      error: '',
      user: null,
    },
  },
};

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    const mergedTheme = preloadedState.globalSlice?.theme
      ? deepmerge(theme, preloadedState.globalSlice.theme)
      : theme;
    return (
      <Provider store={store}>
        <ThemeProvider colorMode="day" theme={mergedTheme}>
          {children}
        </ThemeProvider>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
