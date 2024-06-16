import {
  CalendarIcon,
  CommentIcon,
  HomeIcon,
  ProjectIcon,
  SearchIcon,
} from '@primer/octicons-react';
import { Octicon, Text, useTheme } from '@primer/react';
import React, { useState } from 'react';
import { Box, Flex } from 'rebass';

const NAV_ITEMS = [
  {
    label: 'Home',
    icon: HomeIcon,
  },
  {
    label: 'Chats',
    icon: CommentIcon,
  },
  {
    label: 'Projects',
    icon: ProjectIcon,
  },
  {
    label: 'Search',
    icon: SearchIcon,
  },
  {
    label: 'Calendar',
    icon: CalendarIcon,
  },
];

interface NavSidebarProps {
  setShowOverlaySidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavSidebar: React.FC<NavSidebarProps> = ({ setShowOverlaySidebar }) => {
  const theme = useTheme();

  const [selected, setSelected] = useState<string>(NAV_ITEMS[1].label);

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
          sx={{
            gap: theme.theme?.space[3],
          }}
          flexDirection={'column'}>
          {NAV_ITEMS.map((navItem) => (
            <Box
              key={navItem.label}
              sx={{
                ':hover': {
                  cursor: 'pointer',
                },
              }}
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
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavSidebar;
