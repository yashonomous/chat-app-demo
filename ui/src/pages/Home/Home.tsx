import { Flex } from 'rebass';
import Sidebar from '../../components/Sidebar/Sidebar';

import { Avatar, Dialog, Text, useTheme } from '@primer/react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { authSliceActions, authStateSelector } from '../../store/globalSlice/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { USERS } from '../../utils/constants';
import ChatScreen from '../ChatScreen/ChatScreen';
import { chatSidebarSliceActions, chatSidebarStateSelector } from './slice/chatSidebarSlice';

function Home() {
  const theme = useTheme();
  const { user } = useAppSelector(authStateSelector);
  const { selectedChatUser } = useAppSelector(chatSidebarStateSelector);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (user) {
      dispatch(
        chatSidebarSliceActions.setChats(
          user.id === 2
            ? [
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
              ]
            : user.id === 1
            ? [
                {
                  id: 2,
                  name: 'Florencio Dorance',
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
              ]
            : []
        )
      );
    }
  }, [user, dispatch]);

  return (
    <Flex ref={ref} height={'100vh'} alignItems={'stretch'}>
      <Dialog
        // returnFocusRef={returnFocusRef}
        isOpen={isOpen}
        onDismiss={() => {}}
        aria-labelledby="header">
        <div data-testid="inner">
          <Dialog.Header id="header">Select a user</Dialog.Header>
          <Flex
            sx={{
              gap: theme.theme?.space[6],
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
            padding={theme.theme?.space[4]}>
            {USERS.map((user) => (
              <Flex
                key={user.id}
                sx={{
                  ':hover': {
                    cursor: 'pointer',
                  },
                }}
                flexDirection={'column'}
                alignItems={'center'}
                tabIndex={0}
                onClick={() => {
                  dispatch(
                    authSliceActions.setUser({
                      id: user.id,
                      name: user.name,
                      email: user.email,
                      avatar: user.avatar,
                    })
                  );
                  setIsOpen(false);
                }}>
                <Avatar
                  sx={{
                    borderRadius: '25%',
                  }}
                  size={50}
                  src={user.avatar}
                  alt={user.name}
                />
                <Text>{user.name}</Text>
              </Flex>
            ))}
          </Flex>
        </div>
      </Dialog>

      <Sidebar />

      {selectedChatUser ? <ChatScreen /> : t('Welcome to the chat app!')}
    </Flex>
  );
}

export default Home;
