import '@primer/react/lib-esm/utils/test-helpers';
import '@testing-library/jest-dom';
import 'cross-fetch/polyfill';
import { HttpResponse, delay, http } from 'msw';
import { setupServer } from 'msw/node';
import MockEventSource from './__mocks__/eventSourceMock';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.EventSource = MockEventSource as any;

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  http.get('http://localhost:3001/comments', async () => {
    await delay(150);
    return HttpResponse.json('John Smith');
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());
