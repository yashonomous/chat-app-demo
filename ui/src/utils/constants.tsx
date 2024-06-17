import {
  CalendarIcon,
  CommentIcon,
  HomeIcon,
  ProjectIcon,
  SearchIcon,
} from '@primer/octicons-react';
import { IChatUser } from '../pages/Home/slice/chatSidebarSlice';
import { IUser } from '../store/globalSlice/authSlice';

export const USERS: Array<IUser> = [
  {
    id: 1,
    name: 'Elmer Laverty',
    email: 'elmerlaverty1@mail.com',
    avatar: 'https://avatars.githubusercontent.com/u/92997159?v=4',
  },
  {
    id: 2,
    name: 'Florencio Dorrance',
    email: 'florenciodorrance1@mail.com',
    avatar: 'https://avatars.githubusercontent.com/u/92997199?v=4',
  },
];

export const CHATS: Array<IChatUser> = [
  {
    id: 1,
    name: 'Elmer Laverty',
    lastMessage: 'Hello',
    avatar: 'https://avatars.githubusercontent.com/u/92997159?v=4',
    time: '12m',
    unread: true,
    labels: [
      {
        name: 'Question',
        bgColor: '#feeac7',
        textColor: '#e58e4e',
      },
      {
        name: 'Help Wanted',
        bgColor: '#c5f6d6',
        textColor: '#6dc090',
      },
    ],
  },
  {
    id: 2,
    name: 'Florencio Dorrance',
    lastMessage: 'Hello',
    avatar: 'https://avatars.githubusercontent.com/u/92997199?v=4',
    time: '12m',
    unread: true,
    labels: [
      {
        name: 'Question',
        bgColor: '#feeac7',
        textColor: '#e58e4e',
      },
      {
        name: 'Help Wanted',
        bgColor: '#c5f6d6',
        textColor: '#6dc090',
      },
    ],
  },
];

export const NAV_ITEMS = [
  {
    label: 'Home',
    icon: HomeIcon,
  },
  {
    label: 'Chats',
    icon: CommentIcon,
  },
  {
    label: 'Projects',
    icon: ProjectIcon,
  },
  {
    label: 'Search',
    icon: SearchIcon,
  },
  {
    label: 'Calendar',
    icon: CalendarIcon,
  },
];
