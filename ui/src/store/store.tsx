import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import chatScreenReducer from '../pages/Home/slice/chatScreenSlice';
import chatSidebarReducer from '../pages/Home/slice/chatSidebarSlice';
import globalReducer from './globalSlice/globalSlice';
import rootSaga from './rootSagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    globalSlice: globalReducer,
    chatSidebarSlice: chatSidebarReducer,
    chatScreenSlice: chatScreenReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  globalSlice: globalReducer,
  chatSidebarSlice: chatSidebarReducer,
  chatScreenSlice: chatScreenReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
  });
};

sagaMiddleware.run(rootSaga);

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
