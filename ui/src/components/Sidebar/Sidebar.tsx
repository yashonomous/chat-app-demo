import { useTheme } from '@primer/react';
import { useEffect, useState } from 'react';
import { Flex } from 'rebass';
import { throttle } from '../../utils/helperFn';
import ChatsSidebar from '../ChatsSidebar/ChatsSidebar';
import CollapsibleChatsSidebar from '../ChatsSidebar/CollpsibleChatSidebar';
import NavSidebar from '../NavSidebar/NavSidebar';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const theme = useTheme();

  const [hideSidebar, setHideSidebar] = useState(false);
  const [showOverlaySidebar, setShowOverlaySidebar] = useState(false);

  useEffect(() => {
    const breakpoint = theme.theme?.breakpoints[1];
    const breakpointNum = Number(breakpoint.substring(0, breakpoint.length - 2));

    const handleResize = () => {
      if (window.innerWidth < breakpointNum) {
        setHideSidebar(true);
      } else {
        setHideSidebar(false);
      }
    };

    if (window.innerWidth < breakpointNum) {
      setHideSidebar(true);
      setShowOverlaySidebar(false);
    }

    const throttledHandleResize = throttle(handleResize, 500); // Adjust the throttle delay as needed

    window.addEventListener('resize', throttledHandleResize);

    return () => {
      window.removeEventListener('resize', throttledHandleResize);
    };
  }, [theme.theme?.breakpoints]);

  return (
    <Flex
      flex={hideSidebar ? '' : 0.35}
      maxWidth={hideSidebar ? '' : '500px'}
      minWidth={hideSidebar ? '' : '350px'}
      sx={{
        borderRight: `1px solid ${theme.theme?.colors.gray.light}`,
      }}>
      <NavSidebar hideSidebar={hideSidebar} setShowOverlaySidebar={setShowOverlaySidebar} />
      {hideSidebar ? (
        <CollapsibleChatsSidebar
          showOverlaySidebar={showOverlaySidebar}
          handleOverlayClick={() => {
            setShowOverlaySidebar(false);
          }}
        />
      ) : (
        <ChatsSidebar />
      )}
    </Flex>
  );
};

export default Sidebar;
