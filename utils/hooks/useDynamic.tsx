import dynamic from 'next/dynamic';
import { ComponentType, useEffect, useMemo } from 'react';

type LazyComponent = ComponentType<any> & {
  preload?: () => void;
};

interface ImportFn {
  (): Promise<{ default: ComponentType<any> }>;
}

interface Options {
  enable?: boolean;
}

const lazyImport = (importFn: ImportFn) => {
  const Component: LazyComponent = dynamic(importFn);
  Component.preload = importFn;

  return Component;
};

function useDynamic(importFn: ImportFn, { enable }: Options = { enable: true }) {
  const component = useMemo(() => lazyImport(importFn), []);

  useEffect(() => {
    if (enable) {
      component.preload?.();
    }
  }, [enable]);

  return component;
}

export default useDynamic;
