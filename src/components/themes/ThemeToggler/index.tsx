import { useContext, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import { ThemeModeContext } from '@/utils/hooks/useDarkMode';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ThemeToggler = () => {
  const themeMode = useContext(ThemeModeContext);
  const theme = useTheme();

  const ColorThemeIcon = useCallback(() => {
    return theme.palette.mode === 'dark' ? <Brightness4Icon sx={{ color: '#FFF' }} /> : <Brightness7Icon sx={{ color: '#FFF' }} />;
  }, []);

  return (
    <IconButton onClick={themeMode.toggleThemeMode} sx={{ ml: 8, mr: 8, width: 42, height: 42 }}>
      <ColorThemeIcon />
    </IconButton>
  );
};

export default ThemeToggler;
