import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import apiService from '../../../../service';
import { GetAloneInventoryOutput } from '../../../../service/inventory/alone';
import { GetTogetherInventoryOutput } from '../../../../service/inventory/together';

type GetInventoryOutput = GetAloneInventoryOutput & GetTogetherInventoryOutput;

export const useInventory = () => {
  const router = useRouter();
  const type = router.query.type as string;
  const id = router.query.id as string;

  const { getAloneInventory } = apiService.inventory.alone;
  const { getTogetherInventory } = apiService.inventory.together;

  const { data: togetherInventory } = useQuery(
    ['getTogetherInventory', id],
    () => getTogetherInventory(id),
    {
      enabled: type === 'together' && !!id,
    },
  );
  const { data: aloneInventory } = useQuery(
    ['getAloneInventory', id],
    () => getAloneInventory(id),
    {
      enabled: type === 'alone' && !!id,
    },
  );

  const inventory = aloneInventory ?? togetherInventory;

  const isInventory = (inventory: unknown): inventory is GetInventoryOutput => {
    if (inventory === undefined || inventory === null) return false;
    return inventory !== undefined;
  };

  if (!isInventory(inventory)) return null;

  return inventory;
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
