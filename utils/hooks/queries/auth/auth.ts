import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { RefreshInput, RefreshOutput } from '../../../../service/auth';
import { authUserAtom } from '../../../recoil/atom/atom';
import useAPI from '../../useAPI';

export const useRefresh = (tokens: RefreshInput) => {
  const router = useRouter();
  const client = useQueryClient();
  const setUser = useSetRecoilState(authUserAtom);
  const resetUser = useResetRecoilState(authUserAtom);
  const fetchRefresh = useAPI((api) => api.auth.refresh);

  const refresh = async () => {
    try {
      const { data } = await client.fetchQuery<RefreshOutput>('refresh', () =>
        fetchRefresh(tokens),
      );
      setUser((prev) => ({ ...prev, ...data }));

      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        resetUser();
        // alert('세션이 만료되었습니다. 다시 로그인 해주세요.');
        alert('re' + JSON.stringify(error) + '//' + localStorage.getItem('recoil-persist'));
        router.replace('/login');
      } else {
        throw new Error();
      }
    }
  };

  return refresh;
};
