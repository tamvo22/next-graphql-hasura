import { useEffect } from 'react';
import { NextPage } from 'next';
import { useSession } from '@/utils/hooks/useSession';
import { useUpdateAtom } from 'jotai/utils';
import { SessionAtom } from '@/utils/store/globalAtoms';

const withProtect = <P extends object>(Component: NextPage<P>) => {
  return (pageProps: P) => {
    const { data } = useSession({ required: true, redirectTo: '/auth/login' });

    const setTokenAtom = useUpdateAtom(SessionAtom);

    useEffect(() => {
      setTokenAtom(data);
    }, [data]);

    return <Component {...pageProps} />;
  };
};

export default withProtect;
