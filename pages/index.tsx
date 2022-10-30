import Link from '@/com/ui/Link';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function Home() {
  return (
    <>
      <Typography sx={{ m: 20 }} variant="h4" component="h1" align="center" gutterBottom>
        Next.js + Hasura + Heroku database + GraphQL Codegen + React-Query
      </Typography>
      <Container maxWidth="sm" sx={{ mt: '1rem', mb: '4rem' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Link href="/login" color="secondary">
            Go to the Login page
          </Link>
        </Box>
      </Container>
    </>
  );
}

export default Home;
