import { initialMockStoreState, renderWithProviders } from '../../test/testUtils';

import { fireEvent, screen, within } from '@testing-library/react';
import { act } from 'react';
import NavSidebar from './NavSidebar';

describe('NavSidebar', () => {
  test('should render all elements when hidesidebar false', async () => {
    renderWithProviders(<NavSidebar hideSidebar={false} setShowOverlaySidebar={() => {}} />, {
      preloadedState: initialMockStoreState,
    });

    const navSidebarElem = screen.getByTestId('nav-sidebar');
    expect(navSidebarElem).toBeInTheDocument();
    expect(
      within(navSidebarElem).getByRole('generic', {
        name: 'logo',
      })
    ).toBeInTheDocument();
    expect(
      within(navSidebarElem).getByRole('generic', {
        name: 'nav-items',
      })
    ).toBeInTheDocument();
    expect(
      within(navSidebarElem).getByRole('generic', {
        name: 'nav-items',
      }).childElementCount
    ).toEqual(5);
  });

  test('should render all elements when hidesidebar true', async () => {
    renderWithProviders(<NavSidebar hideSidebar={true} setShowOverlaySidebar={() => {}} />, {
      preloadedState: initialMockStoreState,
    });

    const navSidebarElem = screen.getByTestId('nav-sidebar');

    expect(
      within(navSidebarElem).getByTestId('nav-item-Chats').classList.contains('shake')
    ).toBeTruthy();
  });

  test('should select nav item on click', async () => {
    renderWithProviders(<NavSidebar hideSidebar={false} setShowOverlaySidebar={() => {}} />, {
      preloadedState: initialMockStoreState,
    });

    const navSidebarElem = screen.getByTestId('nav-sidebar');
    const navItemElem = within(navSidebarElem).getByTestId('nav-item-Home');
    fireEvent.click(navItemElem);

    await act(async () => {
      expect(navItemElem.getAttribute('aria-selected')).toBeTruthy();
    });
  });
});
