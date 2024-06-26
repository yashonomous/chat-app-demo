import { Text, useTheme } from '@primer/react';
import { t } from 'i18next';
import { useEffect, useRef } from 'react';
import FlipMove from 'react-flip-move';
import { Box } from 'rebass';
import { chatScreenStateSelector } from '../../pages/Home/slice/chatScreenSlice';
import { useAppSelector } from '../../store/hooks';
import Loader from '../common/Loader/Loader';
import Message from '../common/Message/Message';

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      elementRef.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  });
  return <div ref={elementRef} />;
};

const ChatArea = () => {
  const theme = useTheme();
  const { scrollToBotton, messages } = useAppSelector(chatScreenStateSelector);

  return (
    <Box
      data-testid={'chat-area'}
      flexGrow={1}
      minHeight={0}
      padding={theme.theme?.space[2]}
      bg={theme.colorMode === 'day' ? theme.theme?.colors.white : theme.theme?.colors.darkMode.bg}
      overflow={'auto'}>
      {messages.data?.length === 0 ? (
        <Box textAlign={'center'} marginTop={'25vh'}>
          <Text as="h1">{t('noMessages')}</Text>
        </Box>
      ) : (
        <FlipMove
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: theme.theme?.space[2],
            background:
              theme.colorMode === 'day'
                ? theme.theme?.colors.white
                : theme.theme?.colors.darkMode.bg,

            ...(messages.isLoading && {
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }),
          }}>
          {messages.isLoading ? (
            <Loader
              sx={
                {
                  // margin: 'auto',
                }
              }
              size="large"
            />
          ) : (
            messages.data?.map((message) => (
              <Message key={message.tempId || message.id} message={message} />
            ))
          )}
        </FlipMove>
      )}
      {scrollToBotton && <AlwaysScrollToBottom />}
    </Box>
  );
};

export default ChatArea;
