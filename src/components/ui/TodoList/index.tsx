import { useState, useEffect, useMemo } from 'react';
import { useAtomValue } from 'jotai/utils';
import { SessionAtomRef } from '@/utils/auth/useSession';
import { Todos } from '@/utils/hasura/generated/graphql';
import { FormControl, RadioGroup, Paper, TodoDiv } from './styled';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';
import LinearProgress from '@mui/material/LinearProgress';

interface TodoListProps {
  todos: Todos[];
  loading: boolean;
  addTodo: (todo: Partial<Todos>) => void;
  updateTodo: (todo: Partial<Todos> & Required<Pick<Todos, 'id'>>) => void;
  deleteTodo: (todo: Partial<Omit<Todos, 'name' | 'completed'>>) => void;
}
const TodoList = ({ todos, loading, addTodo, updateTodo, deleteTodo }: TodoListProps) => {
  const [todoList, setTodoList] = useState<Todos[]>([]);
  const [filter, setFilter] = useState<string>('all');

  const session = useAtomValue(SessionAtomRef);
  const userId = session?.user.id!;

  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  const filtedTodo = useMemo(() => {
    if (filter === 'all') return todoList;
    else if (filter === 'completed') return todoList?.filter((todo) => todo.completed);
    else return todoList?.filter((todo) => !todo.completed);
  }, [filter, todoList]);

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = event.currentTarget.addTodo.value.trim();
    event.currentTarget.addTodo.value = '';

    if (name) {
      // pass along the uid from session user.id to indentify the user's todos
      const newTodo = { name, userId: userId };
      addTodo(newTodo);
    }
  };

  const handleSetTodo = (action: string, todo: Partial<Todos> & Required<Pick<Todos, 'id'>>) => {
    if (action === 'UPDATE') {
      updateTodo(todo);
    } else if (action === 'DELETE') {
      deleteTodo(todo);
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <Grid container spacing={1} alignItems="center">
        <Grid xs={12} sm={12} md={10} item>
          <TextField type="addTodo" variant="outlined" name="addTodo" fullWidth size="small" placeholder="Type ..." />
        </Grid>
        <Grid xs={12} sm={12} md={2} item>
          <Button type="submit" variant="contained" fullWidth>
            Add
          </Button>
        </Grid>
      </Grid>
      <Filter filter={filter} setFilter={setFilter} />
      {!loading ? <LinearProgress /> : null}
      <Paper>
        {filtedTodo?.length > 0 ? (
          <TransitionGroup>
            {filtedTodo?.map((todo) => (
              <Collapse key={todo.id}>
                <TodoItem todo={todo} setTodo={handleSetTodo} />
              </Collapse>
            ))}
          </TransitionGroup>
        ) : (
          <TodoDiv>No Todos...</TodoDiv>
        )}
      </Paper>
    </form>
  );
};

export default TodoList;

interface TodoItemProps {
  todo: Todos;
  setTodo: (action: string, todo: Partial<Todos> & Required<Pick<Todos, 'id'>>) => void;
}

const TodoItem = ({ todo, setTodo }: TodoItemProps) => {
  // marked completed and delete methods here
  const handleToggleCompleted = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTodo('UPDATE', { id: todo.id, completed: event.target.checked });
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setTodo('DELETE', { id: todo.id });
  };

  return (
    <TodoDiv>
      <Checkbox checked={todo?.completed!} onChange={handleToggleCompleted} />
      <Typography sx={{ textDecoration: todo?.completed ? 'line-through' : '' }}>{todo?.name}</Typography>
      <IconButton onClick={handleDelete}>
        <CloseIcon fontSize="medium" />
      </IconButton>
    </TodoDiv>
  );
};

const Filter = ({ filter, setFilter }: { filter: string; setFilter: (update: React.SetStateAction<string>) => void }) => {
  return (
    <FormControl>
      <FormLabel>Status</FormLabel>
      <RadioGroup onChange={(e) => setFilter(e.target.value)} value={filter}>
        <FormControlLabel value="all" control={<Radio />} label="All" />
        <FormControlLabel value="completed" control={<Radio />} label="Completed" />
        <FormControlLabel value="incompleted" control={<Radio />} label="Incompleted" />
      </RadioGroup>
    </FormControl>
  );
};
