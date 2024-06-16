
import App from './App';
import { renderWithProviders } from './test/testUtils';

import { screen } from '@testing-library/react';

describe('App', () => {
  test('initial app render before user selection', () => {
    renderWithProviders(<App />);

    expect(screen.getByTestId('home')).toBeInTheDocument();

    //   expect(screen.getByText(/welcome to the chat app/i)).toBeInTheDocument();
  });
});

// describe('ChatScreen', () => {
//   test('should render ChatScreen component', async () => {
//     renderWithProviders(<App />);

//     const user = screen.getByTestId('user-1');
//     user.click();

//     // await screen.findByText(/john smith/i);
//   });
// });
