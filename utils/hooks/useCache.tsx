import { useEffect, useState } from 'react';
import { QueryKey } from 'react-query';

function useCache<T>(key: QueryKey): [T | null, boolean] {
  const [data, setData] = useState<T | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const cacheJSON = window.localStorage.getItem('REACT_QUERY_OFFLINE_CACHE');

    if (cacheJSON) {
      const cache = JSON.parse(cacheJSON);
      cache.clientState.queries.forEach(
        ({ queryKey, state: { data } }: { queryKey: QueryKey; state: { data: T } }) => {
          if (queryKey === key) {
            setData(data);
          }
        },
      );
    }
    setIsLoaded(true);
  }, []);

  return [data, isLoaded];
}

export default useCache;
