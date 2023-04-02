import { useRouter } from 'next/router';

function useQueryString(name: string): string | undefined {
  const { query } = useRouter();
  const queryString = query[name];

  if (typeof queryString === 'object') throw new Error('Invalid QueryString');

  return queryString;
}

export default useQueryString;
