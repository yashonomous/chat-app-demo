import { useTheme } from '@primer/react';
import React from 'react';
import { Box, Flex } from 'rebass';
import {
  chatSidebarSliceActions,
  chatSidebarStateSelector,
} from '../../pages/Home/slice/chatSidebarSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Input from '../common/Input/Input';
import ChatUser from './ChatUser';
import MessagesHeader from './MessagesHeader';

const ChatsSidebar: React.FC = () => {
  const theme = useTheme();
  const chatSidebarState = useAppSelector(chatSidebarStateSelector);
  const dispatch = useAppDispatch();

  const { chats, selectedChatUser } = chatSidebarState;

  return (
    <Box
      data-testid="chats-sidebar"
      paddingX={[
        theme.theme?.space[2],
        theme.theme?.space[2],
        theme.theme?.space[2],
        theme.theme?.space[3],
      ]}
      // bg="red"
      flex={1}>
      <Flex
        sx={{
          gap: theme.theme?.space[3],
        }}
        flexDirection={'column'}>
        <Box>
          <MessagesHeader />

          <Box width={'100%'} height={'1px'} bg={theme.theme?.colors.gray.light} />
        </Box>

        <Box>
          <Flex
            sx={{
              gap: theme.theme?.space[3],
            }}
            flexDirection={'column'}>
            <Input placeholder="Search Messages" />
            <Flex
              sx={{
                gap: theme.theme?.space[3],
              }}
              flexDirection={'column'}>
              {chats.map((chatUser) => (
                <Box
                  key={chatUser.id}
                  sx={{
                    ':hover': {
                      cursor: 'pointer',
                    },
                  }}
                  tabIndex={0}
                  onClick={() => {
                    dispatch(chatSidebarSliceActions.setSelectedChatUser(chatUser));
                  }}>
                  <ChatUser selected={selectedChatUser?.id === chatUser.id} chatUser={chatUser} />
                </Box>
              ))}
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default ChatsSidebar;
