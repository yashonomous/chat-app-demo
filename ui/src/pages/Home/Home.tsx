import { Avatar, Dialog, Text, useTheme } from '@primer/react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Flex } from 'rebass';
import Sidebar from '../../components/Sidebar/Sidebar';
import { authSliceActions, authStateSelector } from '../../store/globalSlice/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { CHATS, USERS } from '../../utils/constants';
import ChatScreen from '../ChatScreen/ChatScreen';
import {
  IChatUser,
  chatSidebarSliceActions,
  chatSidebarStateSelector,
} from './slice/chatSidebarSlice';

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
            ? ([CHATS.at(0)] as Array<IChatUser>)
            : user.id === 1
            ? ([CHATS.at(1)] as Array<IChatUser>)
            : []
        )
      );
    }
  }, [user, dispatch]);

  return (
    <Flex
      ref={ref}
      data-testid="home"
      height={'100vh'}
      alignItems={'stretch'}
      width={'100%'}
      bg={theme.colorMode === 'day' ? theme.theme?.colors.white : theme.theme?.colors.darkMode.bg}>
      {!user && (
        <Dialog
          id="welcome-dialog"
          // returnFocusRef={returnFocusRef}
          sx={{
            top: '30%',
            margin: 'auto',
            width: ['70% !important', '400px !important'],
            height: ['fit-content !important', 'fit-content !important'],
          }}
          isOpen={isOpen}
          onDismiss={() => {}}
          aria-labelledby="header">
          <div data-testid="inner">
            <Dialog.Header id="header">{t('selectUser')}</Dialog.Header>
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
                  data-testid={`user-${user.id}`}
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
                    src={user.avatar || ''}
                    alt={user.name}
                  />
                  <Text>{user.name}</Text>
                </Flex>
              ))}
            </Flex>
          </div>
        </Dialog>
      )}

      <Sidebar />

      {selectedChatUser ? (
        <ChatScreen />
      ) : (
        <Flex flex={1} justifyContent={'center'}>
          <Box paddingTop={theme.theme?.space[4]}>
            <Text as="h1">{t('welcome')}</Text>
          </Box>
        </Flex>
      )}
    </Flex>
  );
}

export default Home;
