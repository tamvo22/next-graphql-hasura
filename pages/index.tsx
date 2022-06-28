import Link from '@/com/ui/Link';
import Layout from '@/com/layout/Layout';
import { Container, Box } from './styled';
import Title from '@/com/ui/Title';

function Home() {
  return (
    <>
      <Title variant="h4" component="h1" align="center" gutterBottom>
        Next.js + GraphQL + Hasura + Heroku database
      </Title>
      <Container maxWidth="sm">
        <Box>
          <Link href="/login" color="secondary">
            Go to the Login page
          </Link>
        </Box>
      </Container>
    </>
  );
}

export default Home;

Home.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};
