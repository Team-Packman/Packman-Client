import { FocusEvent, KeyboardEvent } from 'react';

export const editHandler = (state: boolean, setter: (state: boolean) => void, fn: () => void) => {
  return {
    onBlur: (e: FocusEvent<HTMLInputElement>) => {
      if (!state) {
        fn();
      }
      setter(false);
    },
    onKeyDown: (e: KeyboardEvent<HTMLInputElement | HTMLSpanElement>) => {
      if (e.key === 'Enter') {
        fn();
        setter(true);
      }
    },
  };
};
