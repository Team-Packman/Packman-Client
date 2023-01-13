import React, { useCallback, useState } from 'react';

function useBoolean() {
  const [boolean, setBoolean] = useState(false);

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
