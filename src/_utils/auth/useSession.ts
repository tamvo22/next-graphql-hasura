import { useMemo } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Session } from 'next-auth';
import { atomWithQuery } from 'jotai/query';
import { atom } from 'jotai';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';

/**
 * Fetches session from `/api/auth/session`.
 * If there is no session, it returns `null`.
 */
export async function fetchSession(): Promise<Session | null> {
  const { data } = await axios.get('/api/auth/session');

  if (!data?.error) {
    if (Object.keys(data!).length) {
      return data;
    }
  }

  return null;
}

// atom reference to session object, access from anywhere in our app
export const SessionAtomRef = atom<Session | null | undefined>(undefined);

/**
 * Fetch client session with both server and local state with Jotai/React-Query.
 * Redirect to login if session expired. Refetch every 30 minutes interval to refresh accessToken.
 */
export const useSession = () => {
  const router = useRouter();

  const setSessionRef = useUpdateAtom(SessionAtomRef);
  const session = useAtomValue(
    useMemo(() => {
      return atomWithQuery((get) => ({
        queryKey: ['session'],
        queryFn: fetchSession,
        retry: true,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchIntervalInBackground: true,
        refetchInterval: 30 * 60 * 1000, // refresh accessToken every 30 minutes
        onSettled(data: Session | null | undefined, error: unknown) {
          if (data) {
            setSessionRef(data);
          } else {
            // redirect to login if session expired
            router.push('/login');
          }
        },
      }));
    }, []),
  );

  return session;
};
