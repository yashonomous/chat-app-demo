import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { IPostMessage } from '../../../store/types/chatScreenTypes';

export interface IMessage {
  id: string;
  name: string;
  text: string;
  dateAdded: number;
  dateEdited?: number;
  status: number;
}

interface IChatScreenState {
  messages: {
    isLoading: boolean;
    data: Array<IMessage> | null;
    error: string;
  };
  postMessage: {
    isLoading: boolean;
    error: string;
  };
}

const initialState: IChatScreenState = {
  messages: {
    isLoading: false,
    data: null,
    error: '',
  },
  postMessage: {
    isLoading: false,
    error: '',
  },
};

const chatScreenSlice = createSlice({
  name: 'chatScreenSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getMessagesAction: (state) => {
      state.messages.isLoading = true;
      state.messages.error = '';
    },
    getMessagesSuccessAction: (state, action: PayloadAction<Array<IMessage>>) => {
      state.messages.isLoading = false;
      state.messages.data = action.payload;
    },
    getMessagesErrorAction: (
      state,
      action: PayloadAction<{
        message: string;
      }>
    ) => {
      state.messages.isLoading = false;
      state.messages.error = action.payload.message;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    postMessageAction: (state, action: PayloadAction<IPostMessage>) => {
      action.payload;
      state.postMessage.isLoading = true;
      state.postMessage.error = '';
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    postMessageSuccessAction: (state, action: PayloadAction<IMessage>) => {
      action.payload;
      state.postMessage.isLoading = false;
    },
    postMessageErrorAction: (state, action: PayloadAction<string>) => {
      state.postMessage.isLoading = false;
      state.postMessage.error = action.payload;
    },
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages.data?.push(action.payload);
    },
    setMessages: (state, action: PayloadAction<Array<IMessage>>) => {
      state.messages.data = action.payload;
    },
  },
});

export const chatScreenSliceActions = chatScreenSlice.actions;

export const chatScreenStateSelector = (state: RootState) => state.chatScreenSlice;

export const chatScreenReducer = chatScreenSlice.reducer;

export default chatScreenReducer;
