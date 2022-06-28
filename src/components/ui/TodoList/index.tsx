import React, { useState, useMemo } from 'react';
import axios from 'axios';
import useSWR, { useSWRConfig } from 'swr';
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

type Todo = {
  id: string;
  name: string;
  completed: boolean;
  createAt: Date;
};

const fetcher = () => axios.get('/api/query/todo/').then((res) => res.data);

// Currying function that returns another function
const AddTodo = (data: Omit<Todo, 'id'>) => {
  return async (todos: Todo[]) => {
    // add new todo item
    const newTodo = await axios.post(`/api/query/todo/`, { data });

    // append to top of the list
    if (todos?.length > 0) return [newTodo?.data, ...todos];
    else return [newTodo?.data];
  };
};

const UpdateTodo = (data: Partial<Omit<Todo, 'createAt'>> & Required<{ id: string }>) => {
  return async (todos: Todo[]) => {
    const { id, ...rest } = data;
    // update todo with id
    await axios.patch(`/api/query/todo/${id}`, { data: { ...rest } });

    // find updated todo index and updated with new data
    let updatedTodos = [...todos];
    const index = todos?.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      updatedTodos[index] = { ...updatedTodos[index], ...rest };
    }

    return updatedTodos;
  };
};

const DeleteTodo = (id: string) => {
  return async (todos: Todo[]) => {
    // delete todo with id
    await axios.delete(`/api/query/todo/${id}`);

    // filter the list, and return items excluding delete
    const filteredTodos = todos.filter((todo: Todo) => todo.id !== id);
    return [...filteredTodos];
  };
};

interface TodoItemProps {
  todo: Todo;
  setTodo: (action: string, todo: Partial<Omit<Todo, 'createAt'>> & Required<{ id: string }>) => void;
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
      <Checkbox checked={todo?.completed} onChange={handleToggleCompleted} />
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

const TodoList = () => {
  const [filter, setFilter] = useState<string>('all');

  const { data } = useSWR<Todo[]>('todos', fetcher);
  const { mutate } = useSWRConfig();

  const filtedTodo = useMemo(() => {
    if (filter === 'all') return data;
    else if (filter === 'completed') return data?.filter((todo) => todo.completed);
    else return data?.filter((todo) => !todo.completed);
  }, [filter, data]) as Todo[];

  const options = { optimisticData: data, rollbackOnError: true };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = event.currentTarget.addTodo.value.trim();
    event.currentTarget.addTodo.value = '';

    if (name) {
      const newTodo = { name, completed: false, createAt: new Date() };
      mutate('todos', AddTodo(newTodo)(data!), options);
    }
  };

  const handleSetTodo = (action: string, todo: Partial<Omit<Todo, 'createAt'>> & Required<{ id: string }>) => {
    if (action === 'UPDATE') {
      mutate('todos', UpdateTodo(todo)(data!), options);
    } else if (action === 'DELETE') {
      mutate('todos', DeleteTodo(todo.id)(data!), options);
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
          <TodoDiv>No Todo...</TodoDiv>
        )}
      </Paper>
    </form>
  );
};

export default TodoList;
