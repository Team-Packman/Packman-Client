import { useQuery, useQueryClient } from 'react-query';
import { Refresh } from '../../../../service/auth';
import useAPI from '../../useAPI';

export const useRefresh = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  const client = useQueryClient();
  const fetchRefresh = useAPI((api) => api.auth.refresh);

  const { data } = useQuery('refresh', () => fetchRefresh(accessToken, refreshToken), {
    enabled: false,
  });

  const refresh = () => client.fetchQuery<Refresh>('refresh');

  return [refresh];
};
