import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';

type LabelType = {
  name: string;
  bgColor: string;
  textColor: string;
};

export interface IChatUser {
  id: number;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  labels: Array<LabelType>;
}

interface IChatSidebarState {
  chats: Array<IChatUser>;
  selectedChatUser: IChatUser | null;
}

const initialState: IChatSidebarState = {
  chats: [],
  selectedChatUser: null,
};

export const chatSidebarSlice = createSlice({
  name: 'chatSidebarSlice',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Array<IChatUser>>) => {
      state.chats = action.payload;
      state.selectedChatUser = action.payload[0];
    },
    setSelectedChatUser: (state, action: PayloadAction<IChatUser>) => {
      state.selectedChatUser = action.payload;
    },
  },
});

export const chatSidebarSliceActions = chatSidebarSlice.actions;

export const chatSidebarStateSelector = (state: RootState) => state.chatSidebarSlice;

export const chatSidebarReducer = chatSidebarSlice.reducer;

export default chatSidebarReducer;
