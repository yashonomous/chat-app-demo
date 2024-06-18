import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { IEditMessage, IPostMessage } from '../../../store/types/chatScreenTypes';

export interface IMessage {
  id: string;
  tempId?: string;
  name: string;
  text: string;
  dateAdded: number;
  dateEdited: number;
  status: number;
}

interface IChatScreenState {
  scrollToBotton: boolean;
  currentMessageToEdit: IMessage | null;
  messages: {
    isLoading: boolean;
    data: Array<IMessage> | null | undefined;
    error: string;
  };
  postMessage: {
    isLoading: boolean;
    error: string;
  };
  deleteMessage: {
    isLoading: boolean;
    error: string;
  };
  editMessage: {
    isLoading: boolean;
    error: string;
  };
}

const initialState: IChatScreenState = {
  scrollToBotton: false,
  currentMessageToEdit: null,
  messages: {
    isLoading: false,
    data: null,
    error: '',
  },
  postMessage: {
    isLoading: false,
    error: '',
  },
  deleteMessage: {
    isLoading: false,
    error: '',
  },
  editMessage: {
    isLoading: false,
    error: '',
  },
};

const chatScreenSlice = createSlice({
  name: 'chatScreenSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages.data?.push(action.payload);
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      state.messages.data = state.messages.data?.filter((message) => message.id !== action.payload);
    },
    editMessage: (state, action: PayloadAction<IEditMessage>) => {
      state.messages.data = state.messages.data?.map((message) => {
        if (message.id === action.payload.id) {
          return {
            ...message,
            text: action.payload.text,
            dateEdited: Date.now(),
          };
        }
        return message;
      });
    },
    setMessages: (state, action: PayloadAction<Array<IMessage>>) => {
      state.messages.data = action.payload;
    },
    setCurrentMessageToEdit: (state, action: PayloadAction<IMessage | null>) => {
      state.currentMessageToEdit = action.payload;
    },
    setScrollToBottom: (state, action: PayloadAction<boolean>) => {
      state.scrollToBotton = action.payload;
    },
    updateAddedMessageId: (
      state,
      action: PayloadAction<{
        oldId: string;
        newId: string;
      }>
    ) => {
      state.messages.data = state.messages.data?.map((message) => {
        if (message.tempId === action.payload.oldId) {
          return {
            ...message,
            id: action.payload.newId,
          };
        }
        return message;
      });
    },

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
    postMessageAction: (state, _action: PayloadAction<IPostMessage>) => {
      state.postMessage.isLoading = true;
      state.postMessage.error = '';
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    postMessageSuccessAction: (state, _action: PayloadAction<IMessage>) => {
      state.postMessage.isLoading = false;
    },
    postMessageErrorAction: (state, action: PayloadAction<string>) => {
      state.postMessage.isLoading = false;
      state.postMessage.error = action.payload;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteMessageAction: (state, _action: PayloadAction<string>) => {
      state.deleteMessage.isLoading = true;
      state.deleteMessage.error = '';
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deleteMessageSuccessAction: (state, _action: PayloadAction<boolean>) => {
      state.deleteMessage.isLoading = false;
    },
    deleteMessageErrorAction: (state, action: PayloadAction<string>) => {
      state.deleteMessage.isLoading = false;
      state.deleteMessage.error = action.payload;
    },

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    editMessageAction: (state, _action: PayloadAction<IEditMessage>) => {
      state.editMessage.isLoading = true;
      state.editMessage.error = '';
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    editMessageSuccessAction: (state, _action: PayloadAction<IMessage>) => {
      state.editMessage.isLoading = false;
    },
    editMessageErrorAction: (state, action: PayloadAction<string>) => {
      state.editMessage.isLoading = false;
      state.editMessage.error = action.payload;
    },
  },
});

export const chatScreenSliceActions = chatScreenSlice.actions;

export const chatScreenStateSelector = (state: RootState) => state.chatScreenSlice;

export const chatScreenReducer = chatScreenSlice.reducer;

export default chatScreenReducer;
