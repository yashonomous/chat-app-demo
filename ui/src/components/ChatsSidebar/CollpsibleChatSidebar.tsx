import emotionStyled from '@emotion/styled';
import { useTheme } from '@primer/react';
import { Theme } from '@primer/react/lib-esm/ThemeProvider';
import React from 'react';
import { Box, Flex } from 'rebass';
import {
  chatSidebarSliceActions,
  chatSidebarStateSelector,
} from '../../pages/Home/slice/chatSidebarSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Input from '../common/Input/Input';
import Overlay from '../common/Overlay/Overlay';
import ChatUser from './ChatUser';
import MessagesHeader from './MessagesHeader';

interface IChatsSidebarProps {
  showOverlaySidebar: boolean;
  handleOverlayClick: () => void;
}

interface SidebarContainerProps {
  isOpen: boolean;
  theme: Theme;
}

const SidebarContainer = emotionStyled.div<SidebarContainerProps>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 300px;
  z-index: 10;
  background-color: ${(props) =>
    props.theme.colorMode === 'day'
      ? props.theme.theme?.colors.white
      : props.theme.theme?.colors.darkMode.bg};
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  transform: ${(props) => (props.isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease-in-out;
`;

const StyledOverlay = emotionStyled(Overlay)<SidebarContainerProps>`
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
`;

const CollapsibleChatsSidebar: React.FC<IChatsSidebarProps> = ({
  showOverlaySidebar,
  handleOverlayClick,
}) => {
  const theme = useTheme();
  const { chats, selectedChatUser } = useAppSelector(chatSidebarStateSelector);
  const dispatch = useAppDispatch();

  return (
    <Box id="overlay-sidebar">
      <SidebarContainer theme={theme} isOpen={showOverlaySidebar}>
        <Flex
          sx={{
            gap: theme.theme?.space[3],
          }}
          paddingX={[
            theme.theme?.space[2],
            theme.theme?.space[2],
            theme.theme?.space[2],
            theme.theme?.space[3],
          ]}
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
      </SidebarContainer>

      <StyledOverlay
        theme={theme}
        isOpen={showOverlaySidebar}
        tabIndex={0}
        onClick={handleOverlayClick}
      />
    </Box>
  );
};

export default CollapsibleChatsSidebar;
