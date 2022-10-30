import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Github from '/public/github-icon.svg';
import Google from '/public/google-icon.svg';
import Paper from '@mui/material/Paper';

export const Providers = styled('div')`
  width: 100%;
  margin: 0;
  .MuiButton-root {
    margin-bottom: 5px;
    padding: 10px;
  }
`;

export const GoogleIcon = styled(Image)`
  filter: ${({ theme }) => theme.palette.mode === 'dark' && 'brightness(0) invert(1)'};
`;

export const GitHubIcon = styled(Image)`
  filter: ${({ theme }) => theme.palette.mode === 'dark' && 'invert(1) sepia(1)'};
`;

interface ProviderProps {
  providers: Record<string, any>;
  onSignIn: (event: React.MouseEvent<HTMLButtonElement>, providerId: string) => void;
}

export default function Provider({ providers, onSignIn }: ProviderProps) {
  return (
    <Paper sx={{ width: '100%', padding: '20px 40px' }} elevation={3}>
      <Typography sx={{ m: 2 }} variant="h5" component="h2" align="center">
        Provider Sign In
      </Typography>
      {providers &&
        Object.values(providers)?.map((provider) => {
          if (provider.name === 'Credentials') return;

          return (
            <Providers key={provider.name}>
              <Button
                variant="outlined"
                fullWidth
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => onSignIn(e, provider.id)}
                startIcon={<ProviderIcon name={provider.name} />}>
                Sign in with {provider.name}
              </Button>
            </Providers>
          );
        })}
    </Paper>
  );
}

const ProviderIcon = ({ name }: { name: string }) => {
  if (name === 'Google') return <GoogleIcon src={Google} alt="Google Icon" width={24} height={24} />;
  else return <GitHubIcon src={Github} alt="Github Icon" width={24} height={24} />;
};
