import '@primer/react/lib-esm/utils/test-helpers';
import '@testing-library/jest-dom';
import MockAdapter from 'axios-mock-adapter';
import 'cross-fetch/polyfill';
import axiosInstance from '../axios/axios';
import MockEventSource from './__mocks__/eventSourceMock';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.EventSource = MockEventSource as any;

const mock = new MockAdapter(axiosInstance);

jest.setTimeout(30000);

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

export const MESSAGES_MOCK = [
  {
    id: 'b40ce360-1af4-4df0-8b2d-d29b0865f15e',
    name: 'Florencio Dorrance',
    text: 'Hello',
    dateAdded: 1573961291493,
    dateEdited: 1574224441310,
    status: 1,
  },
  {
    name: 'Elmer Laverty',
    text: 'from stream stable 1',
    id: '56ec734f-6683-41f1-a174-8e9cf2961332',
    dateAdded: 1718480149587,
    dateEdited: 1718480149587,
    status: 1,
  },
];

// Enable API mocking before tests.
beforeAll(() => {
  mock.onGet('/comments').reply(200, MESSAGES_MOCK);
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => {
  mock.reset();
});
