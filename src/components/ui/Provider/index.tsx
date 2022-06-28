import { PaperProvider, Title, Providers, GoogleIcon, GitHubIcon } from './styled';
import Button from '@mui/material/Button';
import Github from '/public/github-icon.svg';
import Google from '/public/google-icon.svg';

interface ProviderProps {
  providers: Record<string, any>;
  onSignIn: (event: React.MouseEvent<HTMLButtonElement>, providerId: string) => void;
}

export default function Provider({ providers, onSignIn }: ProviderProps) {
  return (
    <PaperProvider elevation={3}>
      <Title variant="h5" component="h2" align="center">
        Provider Sign In
      </Title>
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
    </PaperProvider>
  );
}

const ProviderIcon = ({ name }: { name: string }) => {
  if (name === 'Google') return <GoogleIcon src={Google} alt="Google Icon" width={24} height={24} />;
  else return <GitHubIcon src={Github} alt="Github Icon" width={24} height={24} />;
};
