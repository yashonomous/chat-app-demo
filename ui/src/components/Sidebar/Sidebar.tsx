import { useTheme } from '@primer/react';
import React from 'react';
import { Flex } from 'rebass';
import ChatsSidebar from '../ChatsSidebar/ChatsSidebar';
import NavSidebar from '../NavSidebar/NavSidebar';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const theme = useTheme();
  return (
    <Flex
      flex={0.35}
      sx={{
        borderRight: `1px solid ${theme.theme?.colors.gray.light}`,
      }}>
      <NavSidebar />
      <ChatsSidebar />
    </Flex>
  );
};

export default Sidebar;
