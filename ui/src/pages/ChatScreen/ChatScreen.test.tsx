import { act, screen, within } from '@testing-library/react';
import { IUser, authSliceActions } from '../../store/globalSlice/authSlice';
import { setupStore } from '../../store/store';
import { MESSAGES_MOCK } from '../../test/setup';
import { initialMockStoreState, renderWithProviders } from '../../test/testUtils';
import { CHATS, USERS } from '../../utils/constants';
import { IChatUser, chatSidebarSliceActions } from '../Home/slice/chatSidebarSlice';
import ChatScreen from './ChatScreen';

const mockStore = setupStore(initialMockStoreState);

describe('ChatScreen', () => {
  beforeAll(async () => {
    mockStore.dispatch(authSliceActions.setUser(USERS.at(0) as IUser));
    mockStore.dispatch(chatSidebarSliceActions.setChats([CHATS.at(1)] as Array<IChatUser>));
    mockStore.dispatch(chatSidebarSliceActions.setSelectedChatUser(CHATS.at(1) as IChatUser));
  });

  test('should render correct user header', async () => {
    renderWithProviders(<ChatScreen />, {
      store: mockStore,
    });

    const headerElem = screen.getByRole('generic', {
      name: 'chat-screen-header',
    });
    expect(headerElem).toBeInTheDocument();
    expect(within(within(headerElem).getByRole('button')).getByText(/call/i)).toBeInTheDocument();
    expect(within(headerElem).getByText((USERS.at(1) as IUser).name)).toBeInTheDocument();
    expect(within(headerElem).getByText(/online/i)).toBeInTheDocument();
  });

  it('should test number of mocked messages', async () => {
    renderWithProviders(<ChatScreen />, {
      store: mockStore,
    });

    await act(async () => {
      const chatAreaElem = screen.getByTestId('chat-area');

      expect(chatAreaElem).toBeInTheDocument();
      expect(chatAreaElem.childElementCount).toEqual(MESSAGES_MOCK.length);
    });
  });
});
