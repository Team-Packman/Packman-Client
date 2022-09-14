import React from 'react';
import { useResetRecoilState } from 'recoil';
import { authUserAtom, invitationAtom, kakao } from '../../recoil/atom/atom';

function useReset() {
  const resetAuthUser = useResetRecoilState(authUserAtom);
  const resetInvitation = useResetRecoilState(invitationAtom);
  const resetKakao = useResetRecoilState(kakao);

  const resetAllPersist = () => {
    resetAuthUser();
    resetInvitation();
    resetKakao();
  };
  return resetAllPersist;
}

export default useReset;
