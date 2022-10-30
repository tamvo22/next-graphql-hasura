import { styled } from '@mui/material/styles';
import NextLink from '@/com/ui/Link';
import MuiContainer from '@mui/material/Container';
import MuiList from '@mui/material/List';
import MuiListItemButton from '@mui/material/ListItemButton';
import MuiListItemText from '@mui/material/ListItemText';

export const Container = styled(MuiContainer)`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const Main = styled('main')`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Logo = styled('div')`
  font-size: 23px;
  width: 200px;
  white-space: nowrap;
`;

export const Link = styled(NextLink)`
  :hover {
    text-decoration: none;
  }
`;

export const List = styled(MuiList)`
  display: flex;
  flex-direction: row;
  margin-right: 20px;
  padding: 0;
`;

export const ListItemButton = styled(MuiListItemButton)`
  color: ${({ theme }) => theme.palette.primary.main};
  :hover {
    background-color: transparent;
  }
`;

export const ListItemText = styled(MuiListItemText)`
  .MuiTypography-root {
    color: ${({ theme }) => theme.palette.common.white};
    :hover {
      color: ${({ theme }) => theme.palette.secondary.main};
    }
  }
`;
