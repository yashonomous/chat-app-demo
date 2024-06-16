import { ChevronDownIcon, PlusIcon } from '@primer/octicons-react';
import { IconButton, Label, Octicon, Text, useTheme } from '@primer/react';
import { useTranslation } from 'react-i18next';
import { Box, Flex } from 'rebass';

const MessagesHeader = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box>
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <Flex
          sx={{
            gap: theme.theme?.space[2],
          }}
          alignItems={'center'}>
          <Text as="h3">{t('messages')}</Text>
          <Octicon icon={ChevronDownIcon} />
          <Label
            sx={{
              background: theme.theme?.colors?.gray?.light,
              border: 'none',
              fontSize: theme.theme?.fontSizes[0],
            }}>
            12
          </Label>
        </Flex>
        <Box>
          <IconButton
            sx={{
              borderRadius: '50%',
              background: theme.theme?.colors.primary.main,
              '.octicon.octicon-plus': {
                color: 'white',
                size: theme.theme?.fontSizes[3],
              },
            }}
            color="white"
            icon={PlusIcon}
            aria-label="Add Chat"
            unsafeDisableTooltip
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default MessagesHeader;
