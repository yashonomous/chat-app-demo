import { initialMockStoreState, renderWithProviders } from '../../test/testUtils';

import { screen, within } from '@testing-library/react';
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
