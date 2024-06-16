import React, { useEffect } from 'react';
import { Flex } from 'rebass';
import ChatArea from '../../components/ChatScreen/ChatArea';
import ChatScreenHeader from '../../components/ChatScreen/ChatScreenHeader';
import SendMessage from '../../components/ChatScreen/SendMessage';
import { useAppDispatch } from '../../store/hooks';
import { chatScreenSliceActions } from '../Home/slice/chatScreenSlice';

interface ChatScreenProps {}

const ChatScreen: React.FC<ChatScreenProps> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(chatScreenSliceActions.getMessagesAction());

    const createEventSource = () => {
      const eventSource = new EventSource('http://localhost:3001/commentsEvents');

      eventSource.onopen = () => {
        console.log('EventSource connected');
      };

      eventSource.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);

        if (Object.keys(parsedData).length > 0) {
          dispatch(chatScreenSliceActions.addMessage(parsedData));
        }
      };

      eventSource.onerror = (err) => {
        console.error('EventSource failed:', err);
        eventSource.close();
        // Try to reconnect after 5 seconds
        setTimeout(() => {
          createEventSource();
        }, 5000);
      };

      return eventSource;
    };

    const eventSource = createEventSource();

    return () => {
      eventSource.close();
    };
  }, [dispatch]);

  return (
    <Flex flex={1} flexDirection={'column'}>
      <ChatScreenHeader />
      <ChatArea />
      <SendMessage />
    </Flex>
  );
};

export default ChatScreen;
