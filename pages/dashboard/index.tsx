import Layout from '@/com/layout/Layout';
import Container from '@mui/material/Container';
import Title from '@/com/ui/Title';
import TodoList from '@/com/ui/TodoList';

function Dashboard() {
  return (
    <Container maxWidth={'sm'}>
      <Title variant="h5" component="h2" align="center">
        Welcome to Admin Dashboard Todo List
      </Title>
      <TodoList />
    </Container>
  );
}

export default Dashboard;

Dashboard.getLayout = (page: React.ReactElement) => <Layout>{page}</Layout>;
