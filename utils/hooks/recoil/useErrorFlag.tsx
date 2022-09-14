import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { errorFlagAtom } from '../../recoil/atom/atom';

function useErrorFlag() {
  const [isError, setIsError] = useRecoilState(errorFlagAtom);

  useEffect(() => {
    if (isError) {
      throw new Error();
    }

    return () => setIsError(false);
  }, [isError]);

  return setIsError;
}

export default useErrorFlag;
