import { PaperAirplaneIcon } from '@primer/octicons-react';
import { IconButton, useTheme } from '@primer/react';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Box } from 'rebass';
import {
  chatScreenSliceActions,
  chatScreenStateSelector,
} from '../../pages/Home/slice/chatScreenSlice';
import { authStateSelector } from '../../store/globalSlice/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Input from '../common/Input/Input';
import Overlay from '../common/Overlay/Overlay';

const SendMessage = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(authStateSelector);
  const { currentMessageToEdit } = useAppSelector(chatScreenStateSelector);

  const [message, setMessage] = useState('');

  const handleSendMessage = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!currentMessageToEdit) {
      const oldId = 'message' + Math.random();
      dispatch(
        chatScreenSliceActions.postMessageAction({
          oldId,
          name: user?.name ?? '',
          text: message,
        })
      );

      dispatch(
        chatScreenSliceActions.addMessage({
          id: oldId,
          tempId: oldId,
          name: user?.name ?? '',
          text: message,
          dateAdded: Date.now(),
          dateEdited: Date.now(),
          status: 1,
        })
      );
    } else {
      dispatch(
        chatScreenSliceActions.editMessage({
          id: currentMessageToEdit.id,
          name: user?.name ?? '',
          text: message,
        })
      );

      dispatch(chatScreenSliceActions.setCurrentMessageToEdit(null));

      dispatch(
        chatScreenSliceActions.editMessageAction({
          id: currentMessageToEdit.id,
          name: user?.name ?? '',
          text: message,
        })
      );
    }

    setMessage('');
  };

  useEffect(() => {
    if (currentMessageToEdit) {
      setMessage(currentMessageToEdit.text);
    }
  }, [currentMessageToEdit]);

  return (
    <Box
      padding={theme.theme?.space[2]}
      sx={{
        position: 'relative',
      }}>
      <form
        style={{
          display: 'flex',
          flex: 1,
          ...(currentMessageToEdit && {
            zIndex: 10,
            position: 'fixed',
            bottom: 20,
            width: '50vw',
          }),
        }}
        onSubmit={handleSendMessage}>
        <Input
          sx={{
            borderRadius: theme.theme?.radii.full,
            border: 'none',
            padding: theme.theme?.space[2],
            flex: 1,
            marginRight: theme.theme?.space[2],
            bg: theme.theme?.colors.gray.light,
            height: theme.theme?.space[7],
          }}
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <IconButton
          type="submit"
          icon={PaperAirplaneIcon}
          disabled={!message}
          sx={{
            borderRadius: '50%',
            background: theme.theme?.colors.primary.main,
            '.octicon.octicon-paper-airplane': {
              color: 'white',
              size: theme.theme?.fontSizes[2],
            },
          }}
          aria-label="Send Message"
          unsafeDisableTooltip
          // onClick={handleSendMessage}
        />
      </form>

      {currentMessageToEdit && (
        <Overlay onClick={() => dispatch(chatScreenSliceActions.setCurrentMessageToEdit(null))} />
      )}
    </Box>
  );
};

export default SendMessage;
