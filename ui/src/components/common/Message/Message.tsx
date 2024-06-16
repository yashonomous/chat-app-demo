import { Text, useTheme } from '@primer/react';
import React, { RefAttributes, forwardRef } from 'react';
import { Box, Flex } from 'rebass';
import { IMessage } from '../../../pages/Home/slice/chatScreenSlice';
import { authStateSelector } from '../../../store/globalSlice/authSlice';
import { useAppSelector } from '../../../store/hooks';

interface IMessageProps {
  message: IMessage;
}

const getTime = (date: number): string => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

const Message: React.ForwardRefExoticComponent<IMessageProps & RefAttributes<HTMLDivElement>> =
  forwardRef<HTMLDivElement, IMessageProps>(({ message }: IMessageProps, ref) => {
    const theme = useTheme();
    const { user } = useAppSelector(authStateSelector);

    return (
      <Flex ref={ref}>
        <Flex
          sx={{
            position: 'relative',
            borderRadius: theme.theme?.radii.sm,
            // boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
          }}
          maxWidth={'80%'}
          paddingY={[theme.theme?.space[1], theme.theme?.space[2], theme.theme?.space[2]]}
          paddingX={[theme.theme?.space[2], theme.theme?.space[2], theme.theme?.space[3]]}
          marginLeft={message.name === user?.name ? 'auto' : ''}
          bg={
            message.name === user?.name
              ? theme.theme?.colors?.primary.main
              : theme.theme?.colors?.gray.bg
          }>
          <Flex
            sx={{
              gap: theme.theme?.space[8],
            }}
            marginRight={[50, 60, 80]}
            flex={1}
            justifyContent={'space-between'}>
            <Box flex={1}>
              <Text
                fontSize={[
                  '10px',
                  theme.theme?.fontSizes[0],
                  theme.theme?.fontSizes[0],
                  theme.theme?.fontSizes[1],
                ]}
                color={
                  message.name === user?.name
                    ? theme.theme?.colors?.white
                    : theme.theme?.colors?.black
                }>
                {message.text}
              </Text>
            </Box>

            {/* <Box /> */}
          </Flex>

          <Text
            sx={{
              position: 'absolute',
              bottom: 1,
              right: 2,
              //   left: 200,
              // alignSelf: 'end',
            }}
            fontSize={['8px', '8px', '10px']}
            color={theme.theme?.colors?.gray.main}>
            {getTime(message.dateAdded)}
          </Text>
        </Flex>
      </Flex>
    );
  });

export default Message;
