import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

type Router = 'push' | 'replace' | 'back';

export const useHeaderRouter = () => {
  const router = useRouter();
  const { folderId } = router.query;
  const [route, setRoute] = useState<() => void>(() => {});

  const registerURL = (type: Router, url?: string) => () => {
    router[type](url ?? '');
  };

  useEffect(() => {
    if (router.isReady) {
      switch (router.pathname) {
        case '/alone':
          setRoute(() => registerURL('replace', `/packing-list?type=alone&id=${folderId}`));
          return;
        case '/together':
          setRoute(() => registerURL('replace', `/packing-list?type=together&id=${folderId}`));
          return;
        default:
          setRoute(() => registerURL('back'));
      }
    }
  }, [router]);

  return route;
};
