import { signOut } from 'next-auth/react';
import server from '@/utils/com/config';
import { useSession } from '@/utils/auth/useSession';
import Header from './header';
import Footer from './footer';
import { Container, Main, Logo, List, Link, ListItemButton, ListItemText } from './styled';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

interface Layout {
  children: React.ReactNode;
}

const DefaultHeader = () => (
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
);

const AdminHeader = () => {
  function handleSignOut() {
    signOut({ callbackUrl: server + '/login' });
  }

  return (
    <List>
      <Link href="/login">
        <ListItem>
          <ListItemButton onClick={handleSignOut}>
            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </ListItem>
      </Link>
    </List>
  );
};

export default function Layout({ children }: Layout) {
  const session = useSession();

  return (
    <Container maxWidth={false} disableGutters>
      {session ? (
        <Header
          title={
            <Typography color="common.white" noWrap>
              Dashboard
            </Typography>
          }>
          <AdminHeader />
        </Header>
      ) : (
        <Header title={<Logo>My Logo</Logo>}>
          <DefaultHeader />
        </Header>
      )}
      <Main id="main" role="main">
        {children}
      </Main>
      <Footer />
    </Container>
  );
}
