import { PaperAirplaneIcon } from '@primer/octicons-react';
import { IconButton, useTheme } from '@primer/react';
import { SyntheticEvent, useState } from 'react';
import { Box } from 'rebass';
import { chatScreenSliceActions } from '../../pages/Home/slice/chatScreenSlice';
import { authStateSelector } from '../../store/globalSlice/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Input from '../common/Input/Input';

const SendMessage = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(authStateSelector);

  const [message, setMessage] = useState('');

  const handleSendMessage = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(
      chatScreenSliceActions.postMessageAction({
        name: user?.name ?? '',
        text: message,
      })
    );

    // dispatch(
    //   chatScreenSliceActions.addMessage({
    //     id: 'message' + Math.random(),
    //     name: user?.name ?? '',
    //     text: message,
    //     dateAdded: Date.now(),
    //     status: 1,
    //   })
    // );

    setMessage('');
  };

  return (
    <Box padding={theme.theme?.space[2]}>
      <form style={{ display: 'flex', flex: 1 }} onSubmit={handleSendMessage}>
        <Input
          sx={{
            borderRadius: theme.theme?.radii.full,
            border: 'none',
            padding: theme.theme?.space[2],
            flex: 1,
            marginRight: theme.theme?.space[2],
            bg: theme.theme?.colors.gray.light,
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
    </Box>
  );
};

export default SendMessage;
