import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

type Router = 'push' | 'replace' | 'back';

interface Path {
  folderId?: string;
}

export const useHeaderRouter = (path?: Path): [() => void] => {
  const router = useRouter();
  const [route, setRoute] = useState<(path?: Path) => void>((path?: Path) => {});

  const registerURL = (type: Router, url?: string) => () => {
    router[type](url ?? '');
  };

  useEffect(() => {
    if (router.isReady) {
      switch (router.pathname) {
        case '/packing-list':
          setRoute(() => registerURL('replace', `/folder`));
          return;
        case '/alone':
          setRoute(() => registerURL('replace', `/packing-list?type=alone&id=${path?.folderId}`));
          return;
        case '/together':
          setRoute(() =>
            registerURL('replace', `/packing-list?type=together&id=${path?.folderId}`),
          );
          return;
        default:
          setRoute(() => registerURL('back'));
      }
    }
  }, [router]);

  return [route];
};
