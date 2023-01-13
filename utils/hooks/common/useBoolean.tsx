import React, { useCallback, useState } from 'react';

function useBoolean(initial: boolean): [boolean, VoidFunction, VoidFunction, VoidFunction] {
  const [boolean, setBoolean] = useState<boolean>(initial);

  const setTrue = useCallback(() => {
    setBoolean(true);
  }, []);

  const setFalse = useCallback(() => {
    setBoolean(false);
  }, []);

  const toggle = useCallback(() => {
    setBoolean((prev) => !prev);
  }, []);

  return [boolean, setTrue, setFalse, toggle];
}

export default useBoolean;
