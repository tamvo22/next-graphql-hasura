import React from 'react';
import server from '@/utils/com/config';
import { signOut } from 'next-auth/react';
import ThemeToggler from '@/com/themes/ThemeToggler';
import Title from '@/com/ui/Title';
import { AppBar, Toolbar, Stack, HeaderOffset, Link, List, ListItemButton, ListItemText } from '../styled';
import ListItem from '@mui/material/ListItem';

export default function Header() {
  function handleSignOut() {
    signOut({ callbackUrl: server + '/login' });
  }

  return (
    <>
      <AppBar position="fixed">
        <Toolbar component={'div'}>
          <Title color="white" noWrap>
            Dashboard
          </Title>
          <Stack>
            <List>
              <Link href="/login">
                <ListItem>
                  <ListItemButton onClick={handleSignOut}>
                    <ListItemText>Logout</ListItemText>
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
