import { BaseStyles, ThemeProvider, theme } from '@primer/react';
import deepmerge from 'deepmerge';
import { Box } from 'rebass';
import Home from './pages/Home/Home';
import { themeStateSelector } from './store/globalSlice/themeSlice';
import { useAppSelector } from './store/hooks';

function App() {
  const themeState = useAppSelector(themeStateSelector);

  return (
    <ThemeProvider colorMode="day" theme={deepmerge(theme, themeState)}>
      <BaseStyles>
        <Box minHeight="100vh">
          <Home />
        </Box>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;
