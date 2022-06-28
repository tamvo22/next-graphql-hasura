import { CreateContext, Action, Dispatch } from './GenericContext';

export type State = {
  data: string[];
};

const initState: State = {
  data: [],
};

// no type = let it be inferred
const actions = {
  add: (dispatch: Dispatch) => (action: Partial<Action>) => {
    dispatch({ type: 'add', payload: action.payload });
  },
  remove: (dispatch: Dispatch) => () => {
    dispatch({ type: 'remove' });
  },
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'add':
      state.data.push(action.payload);
      return { ...state, data: state.data };
    case 'remove':
      state.data?.pop();
      return { ...state, data: state.data };
    default:
      return { ...state };
  }
};

const { Context, Provider } = CreateContext(reducer, actions, initState);

export { Context, Provider };
