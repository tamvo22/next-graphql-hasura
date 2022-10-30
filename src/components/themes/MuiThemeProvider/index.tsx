import { useMemo } from 'react';
import { ThemeModeContext } from '@/utils/hooks/useDarkMode';
import { useDarkMode } from '@/utils/hooks/useDarkMode';
import useIsMounted from '@/utils/hooks/useIsMounted';
import Layout from '@/com/layout';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { getTheme } from '@/styles/theme';

interface DarkThemeProvider {
  Component: NextPageWithLayout;
  children: React.ReactElement;
}
export default function MuiThemeProvider({ Component, children }: DarkThemeProvider) {
  // Get theme mode and toggle setter function from useDarkMode
  const { mode, themeMode } = useDarkMode();

  const isMounted = useIsMounted();
  // Set MUI theme according to the theme mode
  const theme = useMemo(() => responsiveFontSizes(createTheme(getTheme(mode!))), [mode]);

  // Next.js Per-Page layout
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  // Prevent FOUC flash before page renders
  if (!isMounted() || !mode) {
    return <div style={{ visibility: 'hidden' }}></div>;
  }

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme!}>
        <CssBaseline />
        {getLayout(children)}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
}
