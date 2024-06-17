import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import axiosInstance from '../../../axios/axios';
import { IPostMessage } from '../../../store/types/chatScreenTypes';
import { IMessage, chatScreenSliceActions } from './chatScreenSlice';

// Generator function
export function* getMessagesSaga() {
  try {
    const response: AxiosResponse<Array<IMessage>> = yield axiosInstance.get(`/comments`);

    yield put(chatScreenSliceActions.getMessagesSuccessAction(response.data));
  } catch (error) {
    yield put(
      chatScreenSliceActions.getMessagesErrorAction({
        message: (error as AxiosError).message,
      })
    );
  }
}

// Generator function
function* postMessageSaga(action: PayloadAction<IPostMessage>) {
  try {
    // You can also export the axios call as a function.
    const response: AxiosResponse<IMessage> = yield axiosInstance.post(`/comments`, {
      name: action.payload.name,
      text: action.payload.text,
    });
    yield put(chatScreenSliceActions.postMessageSuccessAction(response.data));
  } catch (error) {
    yield put(chatScreenSliceActions.postMessageErrorAction(error as string));
  }
}

// Generator function
export function* watchGetMessages() {
  yield takeLatest('chatScreenSlice/getMessagesAction', getMessagesSaga);
}

export function* watchPostMessage() {
  yield takeEvery('chatScreenSlice/postMessageAction', postMessageSaga);
}
