import { all, fork } from 'redux-saga/effects';
import { watchGetMessages, watchPostMessage } from '../pages/Home/slice/chatScreenSaga';

const rootSaga = function* () {
  yield all([fork(watchGetMessages), fork(watchPostMessage)]);
};

export default rootSaga;
