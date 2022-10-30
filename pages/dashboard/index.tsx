import useTodos from '@/utils/hasura/generated/useTodos';
import TodoList from '@/com/ui/TodoList';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Dashboard = () => {
  const todos = useTodos({ subscribe: true });
  const { data, status, addTodo, updateTodo, deleteTodo } = todos;

  return (
    <Container sx={{ mt: '2rem', mb: '4rem' }} maxWidth={'sm'}>
      <Typography variant="h5" component="h2" align="center">
        Welcome to Admin Dashboard Todo List
      </Typography>
      <TodoList todos={data!} loading={status === 'success' ? true : false} addTodo={addTodo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </Container>
  );
};

export default Dashboard;
