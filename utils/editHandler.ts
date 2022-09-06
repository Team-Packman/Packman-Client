import { Dispatch, FocusEvent, KeyboardEvent, SetStateAction } from 'react';

export const editHandler = (
  state: boolean,
  setter: Dispatch<SetStateAction<boolean>>,
  fn: () => void,
) => {
  return {
    onBlur: (e: FocusEvent<HTMLInputElement>) => {
      if (!state) {
        fn();
      }
      setter(false);
    },
    onKeyDown: (e: KeyboardEvent<HTMLInputElement | HTMLSpanElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        fn();
        setter(true);
      }
    },
  };
};
