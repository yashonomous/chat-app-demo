import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Flex } from 'rebass';
import ChatArea from '../../components/ChatScreen/ChatArea';
import ChatScreenHeader from '../../components/ChatScreen/ChatScreenHeader';
import SendMessage from '../../components/ChatScreen/SendMessage';
import { authStateSelector } from '../../store/globalSlice/authSlice';
import { useAppDispatch } from '../../store/hooks';
import { chatScreenSliceActions } from '../Home/slice/chatScreenSlice';

interface ChatScreenProps {}

const ChatScreen: React.FC<ChatScreenProps> = () => {
  const { user } = useSelector(authStateSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(chatScreenSliceActions.setScrollToBottom(true));
    dispatch(chatScreenSliceActions.getMessagesAction());

    const createEventSource = () => {
      const eventSource = new EventSource('http://localhost:3001/commentsEvents');

      eventSource.onopen = () => {
        console.log('EventSource connected');
      };

      eventSource.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);

        if (
          Object.keys(parsedData).length > 0 &&
          parsedData.data.name &&
          parsedData.data.name !== user?.name
        ) {
          if (parsedData.type === 'add') {
            dispatch(chatScreenSliceActions.setScrollToBottom(true));
            dispatch(chatScreenSliceActions.addMessage(parsedData.data));
          } else if (parsedData.type === 'edit') {
            dispatch(chatScreenSliceActions.setScrollToBottom(false));
            dispatch(chatScreenSliceActions.editMessage(parsedData.data));
          } else if (parsedData.type === 'delete') {
            dispatch(chatScreenSliceActions.setScrollToBottom(false));
            dispatch(chatScreenSliceActions.deleteMessage(parsedData.data.id));
          }
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
  }, [dispatch, user?.name]);

  return (
    <Flex flex={1} flexDirection={'column'}>
      <ChatScreenHeader />
      <ChatArea />
      <SendMessage />
    </Flex>
  );
};

export default ChatScreen;
