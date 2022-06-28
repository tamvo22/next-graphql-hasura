import { FC, Context, ReactNode, createContext, useReducer, Dispatch as _Dispatch, Reducer } from 'react';

export type State = {
  data: string[];
};

// Very generalized action type
export type Action = { type: string; payload?: any };

// We are not using specific action types.  So we override the React Dispatch type with one that's not generic
export type Dispatch = _Dispatch<Action>;

// Map from action functions of dispatch to their bound versions
type BoundActions<ActionMap> = {
  [K in keyof ActionMap]: ActionMap[K] extends (dispatch: Dispatch) => infer A ? A : never;
};

// The type for the context depends on the State and the action creators
export type AppContext<State, ActionMap> = {
  state: State;
  actions: BoundActions<ActionMap>;
};

type FullContext<State, ActionMap> = {
  Context: Context<AppContext<State, ActionMap>>;
  Provider: FC; // Provider does not take any props -- just children
};

// ActionMap extend an array of argument records
export const CreateContext = <State, ActionMap extends Record<string, (dispatch: Dispatch) => (...args: any[]) => void>>(
  reducer: Reducer<State, Action>,
  actions: ActionMap,
  initState: State,
  init: () => State = (): State => initState,
): FullContext<State, ActionMap> => {
  const Context = createContext<AppContext<State, ActionMap>>({
    state: { ...initState },
    actions: Object.fromEntries(
      Object.keys(actions).map((key) => [key, () => console.error('cannot call action outside of a context provider')]),
    ) as BoundActions<ActionMap>,
  });

  const Provider = ({ children }: { children?: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initState);

    const linkActions = {} as Record<string, any>;
    for (const key in actions) {
      linkActions[key] = (actions as any)[key](dispatch);
    }

    return <Context.Provider value={{ state, actions: linkActions as BoundActions<ActionMap> }}>{children}</Context.Provider>;
  };

  return {
    Context,
    Provider,
  };
};
