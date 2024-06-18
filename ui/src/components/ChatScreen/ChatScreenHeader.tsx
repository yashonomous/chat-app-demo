import { DeviceMobileIcon, GlobeIcon, MoonIcon } from '@primer/octicons-react';
import { Avatar, Box as BoxWrapper, Button, Octicon, Text, Tooltip, useTheme } from '@primer/react';
import { useTranslation } from 'react-i18next';
import { Box, Flex } from 'rebass';
import { chatSidebarStateSelector } from '../../pages/Home/slice/chatSidebarSlice';
import { useAppSelector } from '../../store/hooks';

const ChatScreenHeader = () => {
  const theme = useTheme();
  const { selectedChatUser } = useAppSelector(chatSidebarStateSelector);
  const { t, i18n } = useTranslation();

  return (
    <BoxWrapper
      aria-label="chat-screen-header"
      bg={theme.colorMode === 'day' ? theme.theme?.colors.white : theme.theme?.colors.darkMode.bg}
      sx={{
        borderBottom: `1px solid ${theme.theme?.colors.gray.light}`,
      }}
      padding={theme.theme?.space[3]}>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Flex
          sx={{
            gap: theme.theme?.space[3],
          }}
          alignItems={'center'}>
          <Box>
            <Avatar
              sx={{
                borderRadius: '25%',
              }}
              size={40}
              src={
                selectedChatUser?.avatar ?? 'https://avatars.githubusercontent.com/u/92997159?v=4'
              }
            />
          </Box>
          <Flex flexDirection="column">
            <Text fontWeight={theme.theme?.fontWeights.bold}>{selectedChatUser?.name}</Text>
            <Flex
              sx={{
                gap: theme.theme?.space[1],
              }}
              alignItems="center">
              <Box
                sx={{
                  borderRadius: '50%',
                }}
                size={10}
                bg={theme.theme?.colors?.green.light}
              />
              <Text color={theme.theme?.colors?.gray.main} fontSize={theme.theme?.fontSizes[0]}>
                Online
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          sx={{
            gap: theme.theme?.space[3],
          }}
          alignItems={'center'}>
          <Tooltip direction="s" text={t('changeLanguage')}>
            <Box
              onClick={() => {
                theme.setColorMode(theme.colorMode === 'day' ? 'night' : 'day');
              }}>
              <Octicon icon={MoonIcon} size={24} />
            </Box>
          </Tooltip>

          <Tooltip direction="s" text={t('changeLanguage')}>
            <Box
              tabIndex={0}
              onClick={() => {
                i18n.changeLanguage(i18n.language === 'en' ? 'esp' : 'en');
              }}>
              <Octicon icon={GlobeIcon} size={24} />
            </Box>
          </Tooltip>

          <Button
            sx={{
              borderRadius: theme.theme?.radii.xs,
              background: theme.theme?.colors.primary.light,
              '.octicon.octicon-device-mobile': {
                color: theme.theme?.colors.primary.main,
                size: theme.theme?.fontSizes[3],
              },
            }}
            leadingVisual={DeviceMobileIcon}
            aria-label="Call User">
            <Text color={theme.theme?.colors.primary.main}>Call</Text>
          </Button>
        </Flex>
      </Flex>
    </BoxWrapper>
  );
};

export default ChatScreenHeader;
