import emotionStyled from '@emotion/styled';
import { Octicon, Text, useTheme } from '@primer/react';
import React, { useEffect, useState } from 'react';
import { Box, Flex } from 'rebass';
import { NAV_ITEMS } from '../../utils/constants';

interface NavSidebarProps {
  hideSidebar: boolean;
  setShowOverlaySidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShakeIcon = emotionStyled.div`
  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    20%,
    60% {
      transform: translateX(-10px);
    }
    40%,
    80% {
      transform: translateX(10px);
    }
  }

  &.shake {
    animation: shake 0.5s ease-in-out;
  }

  &:hover {
    cursor: pointer;
  }
`;

const NavSidebar: React.FC<NavSidebarProps> = ({ hideSidebar, setShowOverlaySidebar }) => {
  const theme = useTheme();

  const [selected, setSelected] = useState<string>(NAV_ITEMS[1].label);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (hideSidebar) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 500); // Stop shaking after 0.5s
      return () => clearTimeout(timer);
    }
  }, [hideSidebar]);

  return (
    <Box
      data-testid="nav-sidebar"
      padding={2}
      sx={{
        borderRight: `1px solid ${theme.theme?.colors.gray.light}`,
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
      }}>
      <Flex
        sx={{
          gap: theme.theme?.space[5],
        }}
        flexDirection={'column'}
        alignItems={'center'}>
        <Flex
          aria-label="logo"
          sx={{
            borderRadius: theme.theme?.radii.sm,
          }}
          bg={theme.theme?.colors.primary.main}
          alignItems={'center'}
          justifyContent={'center'}
          size={50}>
          <Text color={theme.theme?.colors.white} fontSize={theme.theme?.fontSizes[4]}>
            Q
          </Text>
        </Flex>
        <Flex
          aria-label="nav-items"
          sx={{
            gap: theme.theme?.space[3],
          }}
          flexDirection={'column'}>
          {NAV_ITEMS.map((navItem) => (
            <ShakeIcon
              key={navItem.label}
              data-testid={`nav-item-${navItem.label}`}
              className={navItem.label === 'Chats' && shake ? 'shake' : ''}
              aria-selected={selected === navItem.label}
              tabIndex={0}
              onClick={() => {
                setSelected(navItem.label);

                if (navItem.label === 'Chats') {
                  setShowOverlaySidebar((prev) => !prev);
                }
              }}>
              <Octicon
                icon={navItem.icon}
                size={28}
                color={
                  selected === navItem.label
                    ? theme.theme?.colors.primary.main
                    : theme.theme?.colors.black
                }
              />
            </ShakeIcon>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavSidebar;
