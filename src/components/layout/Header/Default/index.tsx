import ThemeToggler from '@/com/themes/ThemeToggler';
import { AppBar, Toolbar, Stack, Logo, HeaderOffset, Link, List, ListItemButton, ListItemText } from '../styled';
import ListItem from '@mui/material/ListItem';

export default function Default() {
  return (
    <>
      <AppBar>
        <Toolbar component="div">
          <Logo>My Logo</Logo>
          <Stack>
            <List>
              <Link href="/">
                <ListItem>
                  <ListItemButton>
                    <ListItemText>Home</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link href="/login">
                <ListItem>
                  <ListItemButton>
                    <ListItemText>Login</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
            <ThemeToggler />
          </Stack>
        </Toolbar>
      </AppBar>
      <HeaderOffset />
    </>
  );
}
