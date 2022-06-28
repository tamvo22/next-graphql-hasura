import { createContext } from 'react';
import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';
import { NavbarRefs } from '@/com/layouts/header/DefaultHeader/defaults';
import { Session } from 'next-auth';

export const ThemeModeContext = createContext({ toggleThemeMode: () => {} });

// AccessToken & RefreshToken
/* export type AtomToken = {
  accessToken: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
}; */

export const SessionAtom = atom<Session | null>(null);

// Hamgburger, Navbar and Drawer shared states
export const NavbarAnchorRefsState = atom<NavbarRefs | undefined>(undefined);
export const HamgburgerToggleState = atom<boolean>(false);
export const HamgburgerMenuToggleState = atom<string[]>([]);
export const DashboardDrawerOpenState = atom<boolean>(false);
export const ProjectDrawerOpenState = atom<boolean>(false);
export const ProjectCardsState = atom<CardItem[]>([]);
export const WorkCardsState = atom<CardItem[]>([]);

/**
 * Atoms Family example
 * @param props
 * @returns
 */
/* export function AtomsArray<T>(props?: any) {
  type Param = Partial<T> & {
    id: string;
  };

  var atomIds = atom<string[]>([]);

  const atomsItem = atomFamily(
    (param: Param) => atom({ ...param }),
    (a: Param, b: Param) => a.id === b.id,
  );

  if (props) {
    let ids: string[] = [];

    props?.forEach((prop: any) => {
      ids.push(prop.id);
      atomsItem(prop);
    });

    atomIds = atom<string[]>(ids);
  }

  const atoms = atom(
    (get) => get(atomIds),
    (get, set, param) => {
      if (typeof param === typeof 'string') {
        // type string to Remove
        set(atomIds, (prev) => {
          let newParam = param as string;
          const index = prev.indexOf(newParam);
          return ([] as string[]).concat(prev.slice(0, index), prev.slice(index + 1));
        });

        atomsItem.remove(param as Param);
      } else {
        // else non-string to Add
        let newParam = param as Param;
        set(atomIds, (prev) => [...prev, newParam.id]);
        set(atomsItem(newParam), newParam);
      }
    },
  );

  return { atoms, atomsItem };
}
 */
