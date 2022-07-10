import { useQuery, useQueryClient } from 'react-query';

type SetFn<T> = (value: T | ((prev: T) => T)) => void;
type QueryKey = string | readonly unknown[];
function useGlobalState<T>(key: QueryKey, initialData: T | (() => T)): [T, SetFn<T>];

function useGlobalState<T = undefined>(key: QueryKey, initialData?: T): [T | undefined, SetFn<T>];

function useGlobalState<T>(key: QueryKey, initialData: T): [T | undefined, SetFn<T>] {
  const queryClient = useQueryClient();

  const setGlobalState: SetFn<T> = (value) => {
    if (typeof value === 'function' && value instanceof Function) {
      const prevValue: T | undefined = queryClient.getQueryData(key);

      if (prevValue) {
        const newValue = value(prevValue);
        queryClient.setQueryData(key, newValue);
      } else {
        throw new Error('prev value is undefined');
      }
    } else {
      queryClient.setQueryData(key, value);
    }
  };

  const globalState = useQuery(key, () => initialData, {
    initialData,
    staleTime: Infinity,
    cacheTime: Infinity,
  }).data;

  return [globalState, setGlobalState];
}

export default useGlobalState;
