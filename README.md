# Next.js + NextAuth Authentication + Firebase + Firestore

## The idea behind the example

One of the most difficult aspects of application development is authentication and database storage. In this project app, I'll introduce [Google Firebase](https://firebase.google.com/), one of the most popular authentication services out there, and [Google Cloud Firestore](https://firebase.google.com/docs/firestore/quickstart), one of the most inventive NoSQL database options available. Leveraging [NextAuth](https://next-auth.js.org/) and Firebase, we will develop the login authentication application with [JWT sessions](https://next-auth.js.org/configuration/options#session) and [Next.js 12 middleware](https://nextjs.org/docs/advanced-features/middleware) to prevent unauthorized access to private pages. Additionally, we will use Cloud Firestore features to offer database access and data manipulation.


## Starter project

This project app is based on the starter [Next.js + MUI 5 Light/Dark Mode Theme + TypeScript example](https://github.com/tamvo22/mui-v5-theme).


## Objective

This project app's objective consist of two main components: 1) authentication service, 2) database access after successful authentication. In order to achieve this goal, we would need to do the following:

- Setup environment variables and typescript types

- Customize our login page and components

- Initialize and configure NextAuth 

- Initialize Firebase and Firebase Admin

- Implement Firebase Auth, Firebase Admin Auth and Firestore methods

- Implement Firestore adapter for NextAuth to store provider authenticated user information

- Utilize Next.js middleware to prevent unauthorized access to private pages

- Define the Dashboard with a Todo component that connects to Firestore database to perform CRUD (create, read, update, and delete) operations

- Create backend api routes to handle the Todo requests to Firestore database


## Key points

One of the challenges in using Typescript is learning how to differentiate custom types. We can filter the variables based on the types that are known by using the helper script [isTypeof](https://stackoverflow.com/questions/51528780/typescript-check-typeof-against-custom-type).

```jsx
// src/_utils/helper/typeGuard.ts
export const isTypeOf = <T>(varToBeChecked: any, propertyToCheckFor: keyof T): varToBeChecked is T => (varToBeChecked as T)[propertyToCheckFor] !== undefined;

// pages/login/index.tsx
// Perform type guard for UserCredential type and Error
if (isTypeOf<UserCredential>(auth, 'user')) {
  // handle Auth typeof 'user'
} else {
  // handle Auth typeof 'Error'
}
```

## Let's get started


### Setup environment variables and typescript types

Authenticating applications has never been easy. Fortunately, with the help of the NextAuth library, the authentication process is much easier. For the project app to work correctly, we'll need to set up and configure [NextAuth environment variables](https://next-auth.js.org/configuration/options), Auth0 provider API keys, and Firebase/Firebase Admin Service Accounts. For local development, we'll set the values to `http://localhost:3000`. 

- NEXTAUTH_URL: `http://localhost:3000` or provide domain url.

- NEXTAUTH_SECRET and JWT_SECRET: use the [Vercel secret generator](https://generate-secret.vercel.app/32) tool to generate a secret key.

- GITHUB_ID and GITHUB_SECRET: [Github account settings](https://github.com/settings/) > OAuth Apps is where you can find this information. We will need to set the authorized home page and callback urls to allow call from NextAuth Github provider API.
    
  - Homepage URL: `http://localhost:3000`
  - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

- GOOGLE_ID and GOOGLE_SECRET: We can generate this information from the [Google Console](https://console.cloud.google.com/apis/credentials) > OAuth 2.0. We must provide the authorized and callback urls to allow call from NextAuth Google provider API.

  - Authorized JavaScript origins: `http://localhost:3000` 
  - Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`

- Firebase Auth: We will need to create a [Google Project](https://console.firebase.google.com/) to get the PROJECT_ID, API_KEY, and APP_ID needed to initialize Firebase. These keys will be public keys. Therefore, we will add the prefix NEXT_PUBLIC_prefix to make them available to the client.

  - NEXT_PUBLIC_FIREBASE_PROJECT_ID=
  - NEXT_PUBLIC_FIREBASE_API_KEY=
  - NEXT_PUBLIC_FIREBASE_APP_ID=

- Firebase Admin: we would need to create a Service Account either from the [Google Project](https://console.firebase.google.com/) settings or [Google Console](https://console.cloud.google.com/apis/credentials) > Service Accounts to get the CLIENT_EMAIL and PRIVATE_KEY. 
 
  - FIREBASE_ADMIN_CLIENT_EMAIL=
  - FIREBASE_ADMIN_PRIVATE_KEY=


Next, we will need to declare the [NexAuth typescript types](src/_types/next-auth.d.ts) for our app. Since we will be using NextAuth JWT session, we don't need to keep track of the session in our database and NextAuth manage our session via JWT.

```jsx
// src/_types/next-auth.d.ts
declare module 'next-auth' {
  type Role = 'admin' | 'user';

  interface Credential {
    email: string;
    password: string;
  }

  ...
}
declare module 'next-auth/jwt' {
  interface JWT {
    name: string;
    email: string;
    picture: string;
    sub: string;
    id: string;
    user: User;
  }
}
```

### Customize our login page and components

Two components that make up the [Login page](pages/login/index.tsx) is the CredentialForm component, which is a custom credential login form, and the Provider component, which consists of provider list callback to authenticate with Auth0 Google Provider and GitHub Provider. In getServerSideProps, we will perform a check to redirect the user to the Dashboard if a session already exists. Otherwise, we will generate a CSRF token and get the NextAuth provider list to be assigned to our Provider component to be displayed. To start the provider sign-in process, we can simply use the NextAuth signIn method and send the provider id it receives from our handleSignInProvider function. After integrating Firebase into our app, we will revisit the handleOnSubmit function to continue with Firebase credential login process.

```jsx
// pages/login/index.tsx
const handleSignInProvider = async (event: React.MouseEvent<HTMLButtonElement>, providerId: string) => {
    event.preventDefault();
    // reset error message
    formErrorSet(undefined);

    await signIn(providerId, {
      callbackUrl: `${Server}/dashboard`,
    });
  }

  // handle CredentialForm 
  async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    // reset error message
    event.preventDefault();
    formErrorSet(undefined);

    const email = event.currentTarget.email.value;
    const password = event.currentTarget.password.value;

    // send email and password to Firebase for authentication
    // Then send the return token to NextAuth API for authorization
  }

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
```


### Initialize and configure NextAuth 

We will initialize and configure the NextAuth api route handler [`[...nextauth.js]`](pages/api/auth/%5B...nextauth%5D.ts). You can find more information on the [NextAuth website](https://next-auth.js.org/) for additional configuration information.

- providers: configuration for GithubProvider, and GoogleProvider provider and CredentialsProvider. We will integrate Firebase Admin Auth into the CredentialsProvider after we initialize Firebase Admin SDK.

- adapter: database connector to store our provider authenticated user information, such as User and Account information. We will implement the Firestore Admin Adapter later.

- secret: this will be our process.env.NEXTAUTH_SECRET environment variable.

- session: We will use encrypted JWT session cookie instead of the database session option.

- jwt: this will be our process.env.JWT_SECRET environment variable.

- pages: corresponding pages for the login process.

- callbacks: provide extra control during the authentication phrase. We can configure any parameters we need to pass along with our JWT token, such as user role, custom claims, rotating accessToken and refreshToken in the JWT callback.

```jsx
// pages/api/auth/[...nextauth].js
export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'firebase-credential', // referense multiple credential login option by id
      name: 'Credentials',
      credentials: {
        // declare credential object
        auth: { label: 'auth', type: 'text' },
      },
      async authorize(credentials, req) {
        const authUser = JSON.parse(credentials?.auth!);
        // perform custom authentication
      },
    }),
    // Auth0 Providers
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // @ts-ignore
      scope: 'read:user',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name ?? profile.login,
          email: profile.email!,
          image: profile.avatar_url,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  //connect to our database to store authentication information such as User and Account information
  adapter: (Adapter),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    // use encrypted JWT (JWE) stored in the session cookie, instead of database session
    strategy: 'jwt',
    maxAge: 60 * 60, // 1hour
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    // page with our login component
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      // merge token and user data to be encrypted.
      // we can generate custom claims, rotating accessToken and refreshToken to pass along the user object here.
      const newToken = {
        ...token,
        user: {
          ...user!,
          ...token?.user,
          role: user?.role ?? token?.user?.role ?? 'user',
        },
      };

      return newToken;
    },
    async session({ session, token }) {
      // merge session object with our token object. 
      session.user = {
        ...session.user,
        ...token?.user,
      };

      return session;
    },
  },
});
```


### Initialize Firebase and Firebase Admin

[Firebase](https://firebase.google.com/docs/) is separated into two categories: Firebase Admin SDK, which operates on the server, and Firebase SDK, which runs on the client side. Each has individual modules such as Auth and Firesore that we may incorporate into our app. We'll be using the followign modules in our app:

- [Firebase Auth](https://firebase.google.com/docs/auth): perform client authentication.

- [Firebase Admin Auth](https://firebase.google.com/docs/auth/admin): verify user authentication on the server.

- [Firebase Admin Firestore](https://firebase.google.com/docs/firestore): access to cloud database storage on our backend server and doesn't require additional [security rules](https://firebase.google.com/docs/rules).


Firebase SDK implementations currently consist of version 8 and version 9 being the latest version. Compare to Firebase v8, [Firebase version 9's](https://firebase.google.com/docs/web/modular-upgrade) provides a modular 'tree-shaking', greatly improving the app's bundle size and speed. We will be using Firebase V9 in our app.

The boiler codes provided in [initFirebase.ts](src/_utils/firebase-v9/firebase/initFirebase.ts) and [initFirebaseAdmin.ts](src/_utils/firebase-v9/firebase-admin/initFirebaseAdmin.ts) will help us initiate Firebase into our app, and we only need to supply the environment variables. You can learn more about [Firebase Setup ](https://firebase.google.com/docs/web/setup) and [Firebase Admin Setup](https://firebase.google.com/docs/admin/setup) docs. 



### Implement Firebase Auth, Firebase Admin Auth and Firestore methods

For our NextAuth CredentialsProvider, we will create a module called [useAuth](src/_utils/firebase-v9/firebase/useAuth.ts) which uses Firebase Auth methods. We only need the two methods: signInWithEmailAndPassword(), which authenticates our user's email and password; and getIdToken(), which gets the Firebase Auth token after a successful sign-in. 

In addition, it is important that we set the { persistence: [inMemoryPersistence] } option for our Firebase Auth initialization, which is comparable to v8 "firebase.auth.Auth.Persistence.NONE" when initializing Firebase Auth into our app. This will disable [Google Auth's persistent state management](https://firebase.google.com/docs/auth/web/auth-state-persistence) and let NextAuth handle the session state management instead.

```jsx
// src/_utils/firebase-v9/firebase/useAuth.ts
// disable Firebase persistent session state management
const firebaseAuth = initializeAuth(firebaseApp, { persistence: [inMemoryPersistence] });

export default function useAuth() {
  return {
    async getIdToken() {
      return await firebaseAuth.currentUser!.getIdToken(true).catch((error) => null);
    },
    async signIn(email: string, password: string) {
      return await signInWithEmailAndPassword(firebaseAuth, email, password).catch((error) => {
        switch (error.code) {
          case 'auth/user-not-found':
            return 'Incorrect email';
          case 'auth/wrong-password':
            return 'Incorrect password';
          case 'auth/too-many-requests':
            return 'Your account is locked due to too many attempts.';
          default:
            return 'Incorrect username or password';
        }
      });
    },
    ...
  };
}
```

We will now revisit the [Login page's handleOnSubmit function](pages/login/index.tsx#L68) and add the Firebase useAuth's signIn() and getIdToken() methods. The credential handleOnSubmit would call signIn() with the email and password and would either get a successful user object or a failed error code. We then call getIdToken() get the user token and pass it to the server using [NextAuth signIn()](https://next-auth.js.org/getting-started/client#signin) method for verification and create the user session.

```jsx
// pages/login/index.tsx
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

      // send the Auth token to NextAuth signIn API for authorization
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
}
```

We would need to implement Firestore Admin modules needed for NextAuth credential authorization and NextAuth adapter to connect to our Firestore database for storing provider authenticated user information. You can refer to [Firestore manage data docs](https://firebase.google.com/docs/firestore/manage-data/add-data?hl=en&authuser=0) for additional information on how to perform Firestore get, add, update and delete operations.

- [useAuth.ts](src/_utils/firebase-v9/firebase-admin/useAuth.ts): In our app, we will only use the verifyIdToken method to authorize the client's Firebase token. The other methods are available if you need to get the user profile or set the user roles.

```jsx
  // src/_utils/firebase-v9/firebase-admin/useAuth.ts
export async function verifyIdToken(idToken: string) {
  let checkRevoked = true;
  return await adminAuth
    .verifyIdToken(idToken, checkRevoked)
    .then((decodedToken) => {
      return decodedToken;
    })
    .catch((error) => {
      return error;
    });
}
```

- [useUsers.ts](src/_utils/firebase-v9/firebase-admin/firestore/useUsers.ts): contains the Firestore Admin methods to access the Users documents. The available methods are:

  - addUser: add a new user to the Users collection and return the new user's data and its document id. 
  - getUser: gets the user with the specific document id.
  - getUserByEmail: perform a query and return the first user document matches the email.
  - updateUser: update and overwrite the existing user document.
  - deleteUser: permanently delete the user document if it exists.

```jsx
  const fs = getFirestore(firebaseAdmin);

  export default function useUsers() {
    const Users = fs.collection('users');

    return {
      async addUser<T>(user: Omit<T, 'id'>): Promise<Omit<T, 'id'> & { id: string }> {
        const { id } = await Users.add(user);
        return { ...user, id };
      },
      async getUser<T>(id: string): Promise<T | null> {
        return (await Users.doc(id)
          .get()
          .then((doc) => docToObj(doc))) as T;
      },
      async getUserByEmail<T>(email: string): Promise<T> {
        const ref = Users.where('email', '==', email).limit(1);
        return (await ref.get().then((query) => queryToObj(query))) as T;
      },
      async updateUser<T>(user: Partial<T>): Promise<T | null> {
        const { id, ...data } = user as any;
        await Users.doc(id!).update(data);
        return (await Users.doc(id!)
          .get()
          .then((doc) => docToObj(doc))) as T;
      },
      async deleteUser(id: string): Promise<void> {
        await Users.doc(id!).delete();
      },
    };
  }
```

- [useAccounts.ts](src/_utils/firebase-v9/firebase-admin/firestore/useAccounts.ts): contains the Firestore Admin methods to access the Accounts documents.

  - addAccount: add a new account to the Accounts collection and return the new account's data and its document id. 
  - getAccount: performs a query to find the first document containing the provider name and id.
  - deleteAccount: perform a query similar to getAccount() to get the account and delete it.
  - deleteAccountByUserId: perform a query to delete a user by the userId

```jsx 
  // src/_utils/firebase-v9/firebase-admin/firestore/useAccounts.ts
  const fs = getFirestore(firebaseAdmin);

  export default function useAccounts() {
    const Accounts = fs.collection('accounts');

    return {
      async addAccount<T>(account: T): Promise<T & { id: string }> {
        const { id } = await Accounts.add(account);
        return { ...account, id };
      },
      async getAccount<T>({ provider, providerAccountId }: { provider: string; providerAccountId: string }): Promise<T> {
        const ref = Accounts.where('provider', '==', provider).where('providerAccountId', '==', providerAccountId).limit(1);
        return (await ref.get().then((query) => queryToObj(query))) as T;
      },
      async deleteAccount({ provider, providerAccountId }: { provider: string; providerAccountId: string }) {
        const ref = Accounts.where('provider', '==', provider).where('providerAccountId', '==', providerAccountId).limit(1);
        const accountDocs = await ref.get();

        if (accountDocs.empty) return;
        await fs.runTransaction(async (transaction) => {
          transaction.delete(accountDocs.docs[0]?.ref!);
        });
      },
      async deleteAccountByUserId(userId: string) {
        const ref = Accounts.where('userId', '==', userId);
        const accountDocs = await ref.get();

        if (accountDocs.empty) return;
        await fs.runTransaction(async (transaction) => {
          accountDocs.forEach((account) => transaction.delete(account.ref));
        });
      },
    };
  }
```

### Implement Firestore adapter for NextAuth to store provider authenticated user information

After implementing our Firestore modules, we will create our own custom [NextAuth Firestore adapter](src/_utils/auth/next-auth/FirestoreAdapter.ts). The adapter will allow us to save provider authenticated user information such as users, accounts, and sessions to our Firestore database. Unfortunately, NextAuth doesn't have a compatible Firebase v9 adapter available, so we would need to create our own. However, NextAuth does provides us with the [custom adapter methods](https://next-auth.js.org/tutorials/creating-a-database-adapter) so that we may add calls to our Firestore useUsers and useAccounts module to carry out the required operations. Since we are using JWT session and don't need to record the session information, we can return null for the adapter session and email verificiation methods.

```jsx
export function FirestoreAdapter(): Adapter {
  const fsUsers = useUsers();
  const fsAccounts = useAccounts();

  return {
    async createUser(user) {
      return (await fsUsers.addUser(user)) as AdapterUser;
    },
    async getUser(id) {
      const user = await fsUsers.getUser<AdapterUser>(id);

      return user ? user : null;
    },
    async getUserByEmail(email) {
      const result = await fsUsers.getUserByEmail<AdapterUser>(email);
      return result;
    },
    async getUserByAccount({ provider, providerAccountId }) {
      const account = await fsAccounts.getAccount<Account>({ provider, providerAccountId });
      if (!account) return null;

      const user = await fsUsers.getUser<AdapterUser>(account?.userId!);
      return user ? user : null;
    },
    async updateUser(partialUser) {
      const user = await fsUsers.updateUser<AdapterUser>(partialUser);

      return user!;
    },
    async deleteUser(userId) {
      await fsUsers.deleteUser(userId);
      await fsAccounts.deleteAccountByUserId(userId);

      return null;
    },
    async linkAccount(account) {
      return (await fsAccounts.addAccount<Account>(account)) as Account;
    },
    async unlinkAccount({ provider, providerAccountId }) {
      await fsAccounts.deleteAccount({ provider, providerAccountId });
    },
    ...
  };
}
```

Let's revisit the [NextAuth API's CredentialsProvider authorized function](pages/api/auth/%5B...nextauth%5D.ts#L17) of the NextAuth API and add the finishing touches to complete our NextAuth api route handler now that we have our Firebase Admin Auth module and our adapter.

We will utilize the verifyIdToken function in our CredentialsProvider authorize function to confirm the Firebase client token before sending the decoded data as a user object to NextAuth to create the session. Because NextAuth Adapter will only handle providers' data storage, we will need to handle the custom credential user data storage on our own here. However, since we're using Firebase Auth to log in with our custom credentials, we don't need to perform additional database storage.

```jsx
// pages/api/auth/[...nextauth].ts
CredentialsProvider({
  id: 'firebase-credential',
  name: 'Credentials',
  credentials: {
    auth: { label: 'auth', type: 'text' },
  },
  async authorize(credentials, req) {
    const authUser = JSON.parse(credentials?.auth!);

    //Verify firebase access_token with verifyIdToken
    const decodedToken = await verifyIdToken(authUser.access_token);

    if (decodedToken) {
      // perform additional custom credential data storage here.

      const user: User = {
        id: decodedToken.uid,
        name: authUser.name,
        role: decodedToken.role,
        email: decodedToken.email,
        image: authUser.image,
        emailVerified: null,
      };

      return user;
    } else {
      return null;
    }
  },
})
```

We will assign our Firestore Adapter module to the [NextAuth adapter](pages/api/auth/[...nextauth].ts#L66) property to call to store provider authenticated user information. 
 
```jsx
// pages/api/auth/[...nextauth].ts

adapter: FirestoreAdapter(),

```

### Utilize Next.js middleware to prevent unauthorized access to private pages

Securing our private [Dashoard page](pages/dashboard/index.tsx) will be the last step in the authentication process. Since [middleware was introduced in Next.js 12](https://nextjs.org/docs/advanced-features/middleware), we will take advantage of it to secure our private pages. We will use [getToken](https://next-auth.js.org/configuration/options#jwt-helper) in our middleware to check the request token's validity before either sending the user back to the login page or allowing them access to the dashboard.

```jsx
// pages/_middleware.ts
export const withVerifyToken = async (req: NextMiddleWareProps) => {
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET!,
    // set secureCookie to false for local development
    secureCookie: process.env.NEXTAUTH_URL?.startsWith('https://') ?? !!process.env.VERCEL_URL,
  });

  return token;
};

export async function middleware(req: NextMiddleWareProps) {
  // prevent unauthorized access to dasboard by verifying the req token
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const token = await withVerifyToken(req);

    const url = req.nextUrl.clone();
    url.pathname = '/login';

    if (!token) return NextResponse.redirect(url);
  }

  // else continue access to Dashboard
}
```

### Define the Dashboard with a Todo component that connects to Firestore database to perform CRUD operations

Since we're authenticated and can access our Dashboard, let's make a [TodoList](src/components/ui/TodoList.ts) component so that we can utilize Firestore database to perform CRUD operations. We will be using [Vercel's SWR](https://swr.vercel.app/) to manage server state, and [Axios](https://axios-http.com/) will be used to fetch server data. The following code demonstrate SWR usage while fetching data from our backend api.

  - Get Todos: useSWR will fetch data from our backend api route and return the list of Todos. But first, we would need to filter the Todos list by using [React.useMemo()](https://reactjs.org/docs/hooks-reference.html#usememo) based on the selected filter option before displaying it. 

```jsx
  // src/components/ui/TodoList.ts
  type Todo = {
    id: string;
    name: string;
    completed: boolean;
    createAt: Date; // to help us sort the Todos by ascending order.
  };

  const [filter, setFilter] = useState<string>('all');
  const { data } = useSWR<Todo[]>('todos', fetcher);

  const filtedTodo = useMemo(() => {
    if (filter === 'all') return data;
    else if (filter === 'completed') return data?.filter((todo) => todo.completed);
    else return data?.filter((todo) => !todo.completed);
  }, [filter, data]) as Todo[];

  return (
  ...
    {filtedTodo?.map((todo) => (
      <Collapse key={todo.id}>
        <TodoItem todo={todo} setTodo={handleSetTodo} />
      </Collapse>
    ))}
  ...
  )
```

  - Add Todo: add a new Todo item on form submission. We will use the SWR mutate method with the AddTodo function to send the new Todo item to our backend API and update our Todos state. 

```jsx
  // src/components/ui/TodoList.ts
  const { mutate } = useSWRConfig();

  const options = { optimisticData: data, rollbackOnError: true };

  // manipulate our data by using mutation(), add, update, delete are mutations. 
  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = event.currentTarget.addTodo.value.trim();
    event.currentTarget.addTodo.value = '';

    if (name) {
      const newTodo = { name, completed: false, createAt: new Date() };
      mutate('todos', AddTodo(newTodo)(data!), options);
    }
  };
```

  - Update Todo: the TodoItem component can update the Todo item's completed value to True or False. When we mark a Todo item completed, it will update the Firestore database Todo document as well as our app's completed status.

```jsx
  // src/components/ui/TodoList.ts
  const { mutate } = useSWRConfig();

  const options = { optimisticData: data, rollbackOnError: true };

  // Currying function that returns another function
  const handleSetTodo = (action: string, todo: Partial<Omit<Todo, 'createAt'>> & Required<{ id: string }>) => {
    if (action === 'UPDATE') {
      mutate('todos', UpdateTodo(todo)(data!), options);
    } else if (action === 'DELETE') {
      ...
    }
  };
  ...

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
```

  - Delete Todo: the TodoItem component can update as well as delete the Todo item. When we delete the Todo item, it will delete the database todo document on the backend as well as filter out the Todos list state.

```jsx
  // src/components/ui/TodoList.ts
  const { mutate } = useSWRConfig();

  const options = { optimisticData: data, rollbackOnError: true };

  // Currying function that returns another function
  const handleSetTodo = (action: string, todo: Partial<Omit<Todo, 'createAt'>> & Required<{ id: string }>) => {
    if (action === 'UPDATE') {
      ...
    } else if (action === 'DELETE') {
      mutate('todos', DeleteTodo(todo.id)(data!), options);
    }
  };
  ...

  const DeleteTodo = (id: string) => {
    return async (todos: Todo[]) => {
      // delete todo with id
      await axios.delete(`/api/query/todo/${id}`);

      // filter the list, and return items excluding delete
      const filteredTodos = todos.filter((todo: Todo) => todo.id !== id);
      return [...filteredTodos];
    };
  };
```

### Create backend api routes to handle the Todo requests to Firestore database

Similiar to our Firestore [useUsers](src/_utils/firebase-v9/firebase-admin/firestore/useUsers.ts) and [useAccounts](src/_utils/firebase-v9/firebase-admin/firestore/useAccounts.ts) we will implement the [useTodo](src/_utils/firebase-v9/firebase-admin/firestore/useTodo.ts) to make CRUD request to our Firestore todo collection. 

```jsx 
const fs = getFirestore(firebaseAdmin);

export default function useTodo() {
  const Todo = fs.collection('todos');

  return {
    async add<T>(todo: Omit<T, 'id'>): Promise<Omit<T, 'id'> & { id: string }> {
      const { id } = await Todo.add(todo);
      return { ...todo, id };
    },
    async get() {
      const ref = Todo.orderBy('createAt', 'desc');
      return await ref.get().then((doc) => queryToObjs(doc));
    },
    async update<T>(id: string, todo: Partial<T>): Promise<QueryResult | null> {
      await Todo.doc(id!).update(todo);
      return await Todo.doc(id!)
        .get()
        .then((doc) => docToObj(doc));
    },
    async delete(id: string): Promise<FirebaseFirestore.WriteResult> {
      return await Todo.doc(id!).delete();
    },
  };
}
```

After we implement our Firestore useTodo, we can then implement the [Todo server api](pages/api/query/todo/%5B%5B...slug%5D%5D.ts) route to handle the Todo request. In our api, we will be using the [`optional catch all route [[...slug]]`](https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes) to capture all incoming routes including route without the slug parameter. Before we can handle the requests, we must first determine whether the user making the request has a valid session. The requests are handled based on the request GET, POST, PATCH, and DELETE methods with the corresponding Firestore useTodo methods.

```jsx
// pages/api/query/todo/[[...slug]].ts
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const fsTodo = useTodo();

  if (session) {
    // fetch firestore database
    if (req.method === 'GET') {
      // get Todo[]
      const todos = await fsTodo.get();
      res.status(200).json(todos);
    } else if (req.method === 'POST') {
      // create Todo
      const { data } = req.body;
      const todo = await fsTodo.add(data!);
      res.status(200).json(todo);
    } else if (req.method === 'PATCH') {
      // update Todo by slug id with data
      const { slug } = req.query;
      const { data } = req.body;

      if (typeof slug[0] === 'string') {
        const todo = await fsTodo.update(slug[0], data!);
        res.status(200).json(todo);
      } else {
        res.status(400).json({ error: '400 Invalid Request.' });
      }
    } else if (req.method === 'DELETE') {
      const { slug } = req.query;
      // delete a Todo by slug id
      if (typeof slug[0] === 'string') {
        await fsTodo.delete(slug[0]);
        res.status(200).json({ deleted: true });
      } else {
        res.status(400).json({ error: '400 Invalid Request.' });
      }
    } else {
      res.status(400).json({ error: '400 Invalid Request.' });
    }
  } else {
    res.status(403).json({ error: '403 Forbidden error.' });
  }
};
```

## Conclusion

Our project app using Next.js, NextAuth, Firebase, and Firestore is now complete, showing how to authenticate using NextAuth and Firebase to gain access to Firestore database storage. Although it is a bit lengthy, it includes all of the crucial components of a functional application. I hope the project app is helpful, and I intend to create a lot more intriguing and exciting apps in the future.