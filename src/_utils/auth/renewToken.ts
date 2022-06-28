import { SetStateAction } from 'jotai';
import axios from 'axios';
import { Session } from 'next-auth';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export type RenewToken = {
  session: Session;
  setSession?: (update: SetStateAction<Session | null>) => void;
};

/**
 * Dynamic client Axios fetcher for renewing accessToken
 * @param server boolean - server-side fetch and doesn't save the data to atom state
 * @param props - Takes Atom state to check for token expired, refetch, and save data to the same Atom state
 * @param undefined - Use the default token Atom to check, refetch and save
 */
export async function RenewToken(server: boolean): Promise<Session | null>;
export async function RenewToken(props: RenewToken): Promise<Session | null>;
export async function RenewToken(props?: RenewToken | boolean): Promise<Session | null> {
  const server = typeof props! === 'boolean';

  if (!server) {
    if (props?.session)
      if (props.session.tokenExpires! > new Date().getTime() / 1000) {
        // Silent refresh accessToken if expired
        return props.session;
      }
  }

  const { data } = await axios.get<Session>(publicRuntimeConfig.API_ENDPOINT + '/query/auth/refreshToken');

  if (data?.error) return null;

  // Save new token to Atom
  if (!server) {
    props?.setSession!(data);
  }

  return data;
}
