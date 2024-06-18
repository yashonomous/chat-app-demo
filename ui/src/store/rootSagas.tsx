import { all, fork } from 'redux-saga/effects';
import {
  watchDeleteMessage,
  watchEditMessage,
  watchGetMessages,
  watchPostMessage,
} from '../pages/Home/slice/chatScreenSaga';

const rootSaga = function* () {
  yield all([
    fork(watchGetMessages),
    fork(watchPostMessage),
    fork(watchDeleteMessage),
    fork(watchEditMessage),
  ]);
};

export default rootSaga;
