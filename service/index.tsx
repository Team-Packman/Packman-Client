import createPackingListAPI, { PackingListAPI } from './packingList/index';
import { Config } from '../utils/axios/axios';
import createFolderAPI, { FolderAPI } from './folder/mockAPI';
import createEctAPI, { EctAPI } from './ect/createAPI';
import createInventoryAPI, { InventoryAPI } from './inventory';
import createUserAPI, { UserAPI } from './user/createAPI';
import createAuthAPI, { AuthAPI } from './auth/createAPI';
import createMemberAPI, { MemberAPI } from './member/createAPI';

export interface APIService {
  auth: AuthAPI;
  folder: FolderAPI;
  packingList: PackingListAPI;
  member: MemberAPI;
  inventory: InventoryAPI;
  user: UserAPI;
  ect: EctAPI;
}

export function createAPIService(config: Config): APIService {
  const { axiosWithAuth } = config;

  const auth = createAuthAPI(config);
  const folder = createFolderAPI(axiosWithAuth);
  const packingList = createPackingListAPI(axiosWithAuth);
  const member = createMemberAPI(axiosWithAuth);
  const user = createUserAPI(axiosWithAuth);
  const ect = createEctAPI(axiosWithAuth);
  const inventory = createInventoryAPI(axiosWithAuth);

  return {
    auth,
    folder,
    packingList,
    member,
    user,
    ect,
    inventory,
  };
}
