import { initialMockStoreState, renderWithProviders } from '../../test/testUtils';

import { act, fireEvent, screen, within } from '@testing-library/react';
import Home from './Home';

describe('HomeScreen', () => {
  test('should render dialog', async () => {
    renderWithProviders(<Home />, {
      preloadedState: initialMockStoreState,
    });

    const dialogElem = screen.getByRole('dialog');
    expect(dialogElem).toBeInTheDocument();
    expect(dialogElem.id).toEqual('welcome-dialog');
  });
  test('should render dialog inner elem', async () => {
    renderWithProviders(<Home />, {
      preloadedState: initialMockStoreState,
    });

    const dialogInnerElem = screen.getByTestId('inner');
    expect(dialogInnerElem).toBeInTheDocument();
    expect(dialogInnerElem.querySelector('#header')).toBeInTheDocument();
    expect(within(dialogInnerElem).getByText(/select a user/i)).not.toBeNull();

    const loginUsers = screen.getAllByTestId(/user-\d+/);
    expect(loginUsers).toHaveLength(2);
  });
  test('should render 2 login users', async () => {
    renderWithProviders(<Home />, {
      preloadedState: initialMockStoreState,
    });

    const loginUsers = screen.getAllByTestId(/user-\d+/);
    expect(loginUsers).toHaveLength(2);
  });
});

describe('HomeScreen', () => {
  test('when user-1 seleceted', async () => {
    renderWithProviders(<Home />, {
      preloadedState: initialMockStoreState,
    });

    const user = screen.getByTestId('user-1');
    fireEvent.click(user);

    await act(async () => {
      const chatUser = await screen.findByTestId('chat-user-2');
      expect(chatUser).toBeInTheDocument();
      expect(within(chatUser).getByText(/florencio dorrance/i)).toBeInTheDocument();
    });
  });

  test('when user-2 seleceted', async () => {
    renderWithProviders(<Home />, {
      preloadedState: initialMockStoreState,
    });

    const user = screen.getByTestId('user-2');
    fireEvent.click(user);

    await act(async () => {
      const chatUser = await screen.findByTestId('chat-user-1');
      expect(chatUser).toBeInTheDocument();
      expect(within(chatUser).getByText(/elmer laverty/i)).toBeInTheDocument();
    });
  });
});
