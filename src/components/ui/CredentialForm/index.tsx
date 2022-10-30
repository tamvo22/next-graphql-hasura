import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const Form = styled('form')`
  display: flex;
  justify-content: center;
  flex-direction: column;
  .MuiTextField-root {
    padding-bottom: 10px;
  }
  .MuiButton-root {
    margin: 10px auto;
    padding: 12px 64px;
  }
`;

interface CredentialFormProps {
  csrfToken: string;
  defaultValues: Record<string, any>;
  handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function CredentialForm({ csrfToken, defaultValues, handleOnSubmit }: CredentialFormProps) {
  return (
    <>
      <Paper elevation={3} sx={{ width: '100%', padding: '20px 40px' }}>
        <Typography variant="h5" component="h2" align="center" sx={{ m: 2 }}>
          Credential Sign In
        </Typography>
        <Form onSubmit={handleOnSubmit} autoComplete="off">
          <TextField sx={{ display: 'none' }} type="hidden" name="csrfToken" defaultValue={csrfToken} />
          <InputLabel htmlFor="email">Email</InputLabel>
          <TextField type="email" variant="outlined" name="email" defaultValue={defaultValues.email} required fullWidth size="small" />
          <InputLabel htmlFor="password">Password</InputLabel>
          <TextField type="password" name="password" defaultValue={defaultValues.password} required fullWidth size="small" />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Form>
      </Paper>
    </>
  );
}
