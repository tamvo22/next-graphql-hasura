import * as React from 'react';
import { useSession } from 'next-auth/react';
import DefaultHeader from './Header/Default';
import AdminHeader from './Header/Admin';
import Footer from './Footer';
import { Container, Main } from './styled';

interface Layout {
  children: React.ReactNode;
}

export default function Layout({ children }: Layout) {
  const { data: session } = useSession();

  return (
    <>
      <Container maxWidth={false} disableGutters>
        {session ? <AdminHeader /> : <DefaultHeader />}
        <Main id="main" role="main">
          {children}
        </Main>
        <Footer />
      </Container>
    </>
  );
}
