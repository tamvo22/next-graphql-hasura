import Title from '@/com/ui/Title';
import { PaperCredential, Form } from './styled';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface CredentialFormProps {
  csrfToken: string;
  defaultValues: Record<string, any>;
  handleOnSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function CredentialForm({ csrfToken, defaultValues, handleOnSubmit }: CredentialFormProps) {
  return (
    <PaperCredential elevation={3}>
      <Title variant="h5" component="h2" align="center">
        Credential Sign In
      </Title>
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
    </PaperCredential>
  );
}
