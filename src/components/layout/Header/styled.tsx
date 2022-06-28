import { styled } from '@mui/material/styles';
import MuiToolbar from '@mui/material/Toolbar';
import MuiAppBar from '@mui/material/AppBar';
import MuiStack from '@mui/material/Stack';
import NextLink from '@/com/ui/Link';
import MuiList from '@mui/material/List';
import MuiListItemButton from '@mui/material/ListItemButton';
import MuiListItemText from '@mui/material/ListItemText';

export const AppBar = styled(MuiAppBar)`
  display: flex;
  align-content: space-between;
  flex-direction: row;
  ${(props) => ({ ...props.theme.mixins.toolbar })}
`;

export const Toolbar = styled(MuiToolbar)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
` as typeof MuiToolbar;

export const Stack = styled(MuiStack)`
  flex-direction: row;
  align-items: center;
`;

export const Logo = styled('div')`
  font-size: 23px;
  width: 200px;
  white-space: nowrap;
`;

export const HeaderOffset = styled('div')`
  ${(props) => ({
    ...props.theme.mixins.toolbar,
  })};
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
