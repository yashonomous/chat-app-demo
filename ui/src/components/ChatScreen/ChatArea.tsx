import { Spinner, useTheme } from '@primer/react';
import { useEffect, useRef } from 'react';
import FlipMove from 'react-flip-move';
import { Box } from 'rebass';
import { chatScreenStateSelector } from '../../pages/Home/slice/chatScreenSlice';
import { useAppSelector } from '../../store/hooks';
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
  const { messages } = useAppSelector(chatScreenStateSelector);

  return (
    <Box flexGrow={1} minHeight={0} padding={theme.theme?.space[2]} overflow={'auto'}>
      <FlipMove
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: theme.theme?.space[2],
        }}>
        {messages.isLoading ? (
          <Spinner
            sx={{
              margin: 'auto',
            }}
            size="large"
          />
        ) : (
          messages.data?.map((message) => <Message key={message.id} message={message} />)
        )}
      </FlipMove>
      <AlwaysScrollToBottom />
    </Box>
  );
};

export default ChatArea;