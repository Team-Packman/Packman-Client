import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

type Router = 'push' | 'replace' | 'back';

export const useHeaderRouter = () => {
  const router = useRouter();
  const [route, setRoute] = useState<() => void>(() => {});

  const registerURL = (type: Router, url?: string) => () => {
    router[type](url ?? '');
  };

  useEffect(() => {
    if (router.isReady) {
      switch (router.pathname) {
        case '/alone':
        case '/together':
          setRoute(() => registerURL('replace', '/folder'));
          return;
        default:
          setRoute(() => registerURL('back'));
      }
    }
  }, [router]);

  return route;
};
