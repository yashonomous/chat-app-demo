import { Avatar, Label, Text, useTheme } from '@primer/react';
import React from 'react';
import { Box, Flex } from 'rebass';
import { IChatUser } from '../../pages/Home/slice/chatSidebarSlice';

interface IChatUserProps {
  chatUser: IChatUser;
  selected: boolean;
}

const ChatUser: React.FC<IChatUserProps> = ({ chatUser, selected }) => {
  const theme = useTheme();

  return (
    <Flex
      sx={{
        gap: theme.theme?.space[3],
        borderRadius: theme.theme?.radii.sm,
      }}
      paddingY={theme.theme?.space[2]}
      paddingX={[
        theme.theme?.space[2],
        theme.theme?.space[2],
        theme.theme?.space[2],
        theme.theme?.space[3],
      ]}
      backgroundColor={
        selected
          ? theme.colorMode === 'day'
            ? theme.theme?.colors?.gray?.bg
            : theme.theme?.colors.darkMode.bgLight
          : theme.theme?.colors.white
      }>
      <Box>
        <Avatar
          sx={{
            borderRadius: '25%',
          }}
          size={{
            narrow: 30,
            regular: 40,
            wide: 50,
          }}
          src={
            chatUser.avatar
              ? chatUser.avatar
              : 'https://avatars.githubusercontent.com/u/92997159?v=4'
          }
        />
      </Box>
      <Flex
        flex={1}
        sx={{
          gap: theme.theme?.space[2],
        }}
        flexDirection={'column'}>
        <Flex justifyContent={'space-between'}>
          <Flex flexDirection={'column'}>
            <Text>{chatUser.name}</Text>
            <Text fontSize={theme.theme?.fontSizes[0]} color={theme.theme?.colors?.gray.main}>
              {chatUser.lastMessage}
            </Text>
          </Flex>
          <Box>
            <Text fontSize={theme.theme?.fontSizes[0]} color={theme.theme?.colors?.gray.main}>
              {chatUser.time}
            </Text>
          </Box>
        </Flex>
        <Flex
          sx={{
            gap: theme.theme?.space[2],
          }}
          flexWrap={'wrap'}>
          {chatUser.labels.map((label, index) => (
            <Label
              key={`${label.name}-${index}`}
              sx={{
                background: label.bgColor,
                color: label.textColor,
                fontSize: ['8px', '8px', '10px', '10px'],
                paddingX: theme.theme?.space[2],
              }}
              size="small">
              {label.name}
            </Label>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChatUser;
