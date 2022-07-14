import { KeyboardEvent } from 'react';

export const editHandler = (state: boolean, setter: (state: boolean) => void, fn: () => void) => {
  return {
    onBlur: () => {
      if (!state) {
        fn();
      }
      setter(false);
    },
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        fn();
        setter(true);
      }
    },
  };
};
