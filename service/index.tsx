import createPackingListAPI, { PackingListAPI } from './packingList/index';
import createFolderAPI, { FolderAPI } from './folder/createAPI';
import createEctAPI, { EctAPI } from './ect/createAPI';
import createInventoryAPI, { InventoryAPI } from './inventory';
import createUserAPI, { UserAPI } from './user/createAPI';
import createAuthAPI, { AuthAPI } from './auth/createAPI';

export interface APIService {
  auth: AuthAPI;
  folder: FolderAPI;
  packingList: PackingListAPI;
  inventory: InventoryAPI;
  user: UserAPI;
  ect: EctAPI;
}

export function createAPIService(): APIService {
  const auth = createAuthAPI();
  const folder = createFolderAPI();
  const packingList = createPackingListAPI();
  const user = createUserAPI();
  const inventory = createInventoryAPI();
  const ect = createEctAPI();

  return {
    auth,
    folder,
    packingList,
    user,
    ect,
    inventory,
  };
}

const apiService = createAPIService();

export default apiService;
