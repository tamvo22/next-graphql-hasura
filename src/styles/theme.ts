import { PaletteMode } from '@mui/material';
import MuiTypography from './components/MuiTypography';
import MuiLink from './components/MuiLink';

export const getTheme = (mode: PaletteMode) => {
  return {
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#fff' : '#055f86',
      },
      secondary: {
        main: mode === 'dark' ? '#fff' : '#41c8e3',
      },
    },
    components: {
      MuiTypography: MuiTypography(mode),
      MuiLink: MuiLink(mode),
    },
  };
};
