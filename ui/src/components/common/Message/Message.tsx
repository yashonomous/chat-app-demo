import { PencilIcon, TrashIcon } from '@primer/octicons-react';
import { Octicon, Text, useTheme } from '@primer/react';
import { t } from 'i18next';
import React, { RefAttributes, forwardRef, useState } from 'react';
import { Box, Flex } from 'rebass';
import { IMessage, chatScreenSliceActions } from '../../../pages/Home/slice/chatScreenSlice';
import { authStateSelector } from '../../../store/globalSlice/authSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

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
    const dispatch = useAppDispatch();

    const [showActions, setShowActions] = useState(false);

    const handleMessageDelete = () => {
      dispatch(chatScreenSliceActions.deleteMessage(message.id));
      dispatch(chatScreenSliceActions.deleteMessageAction(message.id));
    };

    const handleMessageEdit = () => {
      dispatch(chatScreenSliceActions.setCurrentMessageToEdit(message));
      dispatch(chatScreenSliceActions.setScrollToBottom(false));

      // dispatch(chatScreenSliceActions.editMessageAction(message));
    };

    return (
      <Flex ref={ref}>
        <Flex
          sx={{
            gap: theme.theme?.space[2],
          }}
          marginLeft={message.name === user?.name ? 'auto' : ''}
          maxWidth={'80%'}
          alignItems={'center'}
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}>
          {message.name === user?.name && showActions && (
            <Flex
              sx={{
                gap: theme.theme?.space[2],
              }}>
              <Box justifySelf={'end'} tabIndex={0} onClick={handleMessageDelete}>
                <Octicon icon={TrashIcon} />
              </Box>
              <Box justifySelf={'end'} tabIndex={0} onClick={handleMessageEdit}>
                <Octicon icon={PencilIcon} />
              </Box>
            </Flex>
          )}
          <Flex
            sx={{
              position: 'relative',
              borderRadius: theme.theme?.radii.sm,
              // boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
            }}
            paddingY={[theme.theme?.space[1], theme.theme?.space[2], theme.theme?.space[2]]}
            paddingX={[theme.theme?.space[2], theme.theme?.space[2], theme.theme?.space[3]]}
            bg={
              message.name === user?.name
                ? theme.theme?.colors?.primary.main
                : theme.theme?.colors?.gray.bg
            }
            tabIndex={0}>
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

            {message.dateAdded < message.dateEdited && (
              <Text
                sx={{
                  position: 'absolute',
                  top: 1,
                  right: 2,
                }}
                fontSize={['8px', '8px', '10px']}
                color={theme.theme?.colors?.gray.main}>
                {t('edited')}
              </Text>
            )}

            <Text
              sx={{
                position: 'absolute',
                bottom: 1,
                right: 2,
              }}
              fontSize={['8px', '8px', '10px']}
              color={theme.theme?.colors?.gray.main}>
              {getTime(message.dateEdited)}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    );
  });

export default Message;
