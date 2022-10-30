import ThemeToggler from '@/com/themes/ThemeToggler';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';

export const AppBar = styled(MuiAppBar)`
  display: flex;
  align-content: space-between;
  flex-direction: row;
  ${(props) => ({ ...props.theme.mixins.toolbar })}
`;

export const HeaderOffset = styled('div')`
  ${(props) => ({
    ...props.theme.mixins.toolbar,
  })};
`;

interface HeaderProps {
  title: React.ReactElement;
  children: React.ReactElement;
}

export default function Header({ title, children }: HeaderProps) {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar component="div" sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {title}
          <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
            {children}
            <ThemeToggler />
          </Stack>
        </Toolbar>
      </AppBar>
      <HeaderOffset />
    </>
  );
}
