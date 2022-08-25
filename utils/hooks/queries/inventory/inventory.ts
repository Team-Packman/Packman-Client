import { useQuery } from 'react-query';
import useAPI from '../../useAPI';

export const useGetTogetherInventory = (id: string) => {
  const getTogetherInventory = useAPI((api) => api.inventory.together.getTogetherInventory);
  const { data } = useQuery(['getTogetherInventory', id], () => getTogetherInventory(id), {
    enabled: !!id,
  });

  return data;
};

export const useGetAloneInventory = (id: string) => {
  const getAloneInventory = useAPI((api) => api.inventory.alone.getAloneInventory);
  const { data } = useQuery(['getAloneInventory', id], () => getAloneInventory(id), {
    enabled: !!id,
  });

  return data;
};
