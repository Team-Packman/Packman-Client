import { useMutation, useQuery, useQueryClient } from 'react-query';
import { DeleteAloneInventoryInput } from '../../../../service/inventory/alone';
import { DeleteTogetherInventoryInput } from '../../../../service/inventory/together';
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

export const useDeleteTogetherInventory = () => {
  const deleteTogetherInventory = useAPI(
    (api) => (params: DeleteTogetherInventoryInput) =>
      api.inventory.together.deleteTogetherInventory(params),
  );

  return deleteTogetherInventory;
};

export const useDeleteAloneInventory = () => {
  const deleteAloneInventory = useAPI(
    (api) => (params: DeleteAloneInventoryInput) =>
      api.inventory.alone.deleteAloneInventory(params),
  );

  return deleteAloneInventory;
};