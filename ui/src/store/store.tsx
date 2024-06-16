import { configureStore } from '@reduxjs/toolkit';
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

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
