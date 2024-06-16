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
      padding={theme.theme?.space[2]}
      backgroundColor={selected ? theme.theme?.colors?.gray?.bg : 'transparent'}>
      <Box>
        <Avatar
          sx={{
            borderRadius: '25%',
          }}
          size={50}
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
                fontSize: theme.theme?.fontSizes[0],
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
