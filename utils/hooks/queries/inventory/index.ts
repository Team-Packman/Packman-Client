import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import apiService from '../../../../service';
import { GetAloneInventoryOutput } from '../../../../service/inventory/alone';
import { GetTogetherInventoryOutput } from '../../../../service/inventory/together';

type GetInventoryOutput = GetAloneInventoryOutput & GetTogetherInventoryOutput;

interface UseInventoryProps {
  id: string;
  type: string;
}

export const useInventory = (props: UseInventoryProps) => {
  const { id, type } = props;

  const { getAloneInventory } = apiService.inventory.alone;
  const { getTogetherInventory } = apiService.inventory.together;

  const { data: togetherInventory } = useQuery(
    ['getTogetherInventory', id],
    () => getTogetherInventory(id),
    {
      enabled: type === 'together' && !!id,
      refetchOnWindowFocus: false,
    },
  );
  const { data: aloneInventory } = useQuery(
    ['getAloneInventory', id],
    () => getAloneInventory(id),
    {
      enabled: type === 'alone' && !!id,
      refetchOnWindowFocus: false,
    },
  );

  const inventory = aloneInventory ?? togetherInventory;

  const isInventoryData = (data: unknown): data is GetInventoryOutput => {
    return data ? true : false;
  };

  return isInventoryData(inventory) ? inventory : null;
};

export const useInventoryMutation = () => {
  const queryClient = useQueryClient();

  const { deleteAloneInventory } = apiService.inventory.alone;
  const { deleteTogetherInventory } = apiService.inventory.together;
  const { mutate: deleteTogetherInventoryMutate } = useMutation(deleteTogetherInventory, {
    onSuccess: () => {
      queryClient.invalidateQueries('getTogetherInventory');
    },
  });
  const { mutate: deleteAloneInventoryMutate } = useMutation(deleteAloneInventory, {
    onSuccess: () => {
      queryClient.invalidateQueries('getAloneInventory');
    },
  });

  return {
    deleteTogetherInventoryMutate,
    deleteAloneInventoryMutate,
  };
};
