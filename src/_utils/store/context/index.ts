import { useContext } from 'react';
import { CombineProviders } from './CombineProviders';
import { Context, Provider } from '@/utils/store/context/providers/ContextProvider';

/**
 * Context store to create dynamic contexts
 * 
 * @example 
 * const store = Store();
   const context = store.context;
   context?.actions.add({ payload: '0' });
   context?.actions.remove()
 * @returns 
 */
export const Store = () => {
  const { state, actions } = useContext(Context);

  return {
    context: {
      state,
      actions,
    },
  };
};

const providers = [Provider];

export const StoreProvider = CombineProviders(...providers);
