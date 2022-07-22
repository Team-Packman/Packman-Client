import { QueryKey, useQueryClient } from 'react-query';

type SetFn<T> = (value: T | ((prev: T) => T)) => void;

function useGlobalSelector<T>(key: QueryKey): [T | undefined, SetFn<T>] {
  const client = useQueryClient();

  const data = client.getQueryData<T>(key);
  const setData: SetFn<T> = (value) => {
    if (typeof value === 'function' && value instanceof Function) {
      const prevValue: T = client.getQueryData(key)!;

      const newValue = value(prevValue);
      client.setQueryData(key, newValue);
    } else {
      client.setQueryData(key, value);
    }
  };
  return [data, setData];
}

export default useGlobalSelector;
