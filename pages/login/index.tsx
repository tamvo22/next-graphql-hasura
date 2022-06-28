import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Server from '@/utils/com/config';
import useFirebase from '@/utils/firebase-v9/firebase/useAuth';
import { signIn, getSession, getCsrfToken, getProviders } from 'next-auth/react';
import { UserCredential } from 'firebase/auth';
import { isTypeOf } from '@/utils/helper/typeGuard';
import CredentialForm from '@/com/ui/CredentialForm';
import Provider from '@/com/ui/Provider';
import Layout from '@/com/layout/Layout';
import { Container, FieldError } from './styled';
import Grid from '@mui/material/Grid';

const ErrorsList = {
  Signin: 'Try signing with a different account.',
  OAuthSignin: 'Try signing with a different account.',
  OAuthCallback: 'Try signing with a different account.',
  OAuthCreateAccount: 'Try signing with a different account.',
  EmailCreateAccount: 'Try signing with a different account.',
  Callback: 'Try signing with a different account.',
  OAuthAccountNotLinked: 'To confirm your identity, sign in with the same account you used originally.',
  EmailSignin: 'Check your email address.',
  CredentialsSignin: 'Sign in failed. Check the details you provided are correct.',
  default: 'Unable to sign in.',
};

type ErrorKeys = keyof typeof ErrorsList;

interface SignInType {
  csrfToken: string;
  providers: Record<string, any>;
}

const defaultValues = {
  email: 'admin@tamvoportfolio.com',
  password: 'demo2021',
};

function Login({ csrfToken, providers }: SignInType) {
  const [formError, formErrorSet] = useState<string | undefined>();

  const router = useRouter();
  const firebase = useFirebase();

  //handle signin errors
  useEffect(() => {
    if (router.query?.error) {
      const error = router.query?.error as ErrorKeys;
      formErrorSet(ErrorsList[error] ?? ErrorsList.default);

      router.push('/login', undefined, { shallow: true });
    }
  }, []);

  const handleSignInProvider = async (event: React.MouseEvent<HTMLButtonElement>, providerId: string) => {
    event.preventDefault();
    // reset error message
    formErrorSet(undefined);

    await signIn(providerId, {
      callbackUrl: `${Server}/dashboard`,
    });
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // reset error message
    event.preventDefault();
    formErrorSet(undefined);

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    // send email and password to Firebase for authentication
    const auth = await firebase.signIn(email!, password!);

    // Perform type guard for UserCredential type and Error
    if (isTypeOf<UserCredential>(auth, 'user')) {
      // get Firebase authentication token after a successfull authentication
      const token = await firebase.getIdToken();

      if (token) {
        const user = JSON.stringify({
          name: auth.user?.displayName,
          access_token: token,
        });

        // send the return token to NextAuth API for authorization
        // https://next-auth.js.org/getting-started/client#signin
        await signIn('firebase-credential', {
          redirect: true,
          auth: user,
          callbackUrl: `${Server}/dashboard`,
        });
      } else {
        // invalid token error
        formErrorSet('Sign in failed');
      }
    } else {
      // set firebase sign in errors
      formErrorSet(auth);
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={4}>
        <Grid xs={12} sm={12} md={12} item>
          <FieldError variant="subtitle1" component="h2">
            {formError}
          </FieldError>
          <CredentialForm csrfToken={csrfToken} defaultValues={defaultValues} handleOnSubmit={handleOnSubmit} />
        </Grid>
        <Grid xs={12} sm={12} md={12} item>
          <Provider providers={providers} onSignIn={handleSignInProvider} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Login;

Login.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  // redirected to dashboard if user already have a session
  if (session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  // initiate csrfToken and provider list
  const csrfToken = await getCsrfToken(context);
  const providers = await getProviders();
  return {
    props: { csrfToken, providers },
  };
};
