import {
  GetFoldersOutput,
  AddFolderInput,
  AddFolderOutput,
  EditFolderNameInput,
  EditFolderNameOutput,
  GetRecentPackingListOutput,
  DeleteFolderOutput,
} from './../../../service/folder/index';
import { AxiosInstance } from 'axios';

export const fetchFolders = async (request: AxiosInstance): Promise<GetFoldersOutput> => {
  return new Promise((r) =>
    setTimeout(() => {
      r({
        status: 200,
        success: true,
        message: '폴더 조회 성공',
        data: {
          aloneFolders: [
            {
              id: '62bbb80d9d5dc1aa4c3d2839',
              title: '국내여행',
              listNum: 3,
            },
            {
              id: '62bbb80d9d5dc1aa4c3d2839',
              title: '본가갈 때 챙겨',
              listNum: 5,
            },
          ],
          togetherFolders: [
            {
              id: '62bbb80d9d5dc1aa4c3d2839',
              title: '해외여행',
              listNum: 3,
            },
            {
              id: '62bbb80d9d5dc1aa4c3d2839',
              title: '엠티, 수련회',
              listNum: 1,
            },
          ],
        },
      });
    }, 500),
  );
};

export const fetchAddFolders = async (
  request: AxiosInstance,
  info: AddFolderInput,
): Promise<AddFolderOutput> => {
  return new Promise((r) =>
    setTimeout(() => {
      r({
        status: 200,
        success: true,
        message: '폴더 생성 성공',
        data: {
          aloneFolders: [
            {
              id: '62bbb80d9d5dc1aa4c3d2839',
              title: '국내여행',
              listNum: 3,
            },
            {
              id: '62bbb80d9d5dc1aa4c3d2839',
              title: '본가갈 때 챙겨',
              listNum: 5,
            },
          ],
          togetherFolders: [
            {
              id: '62bbb80d9d5dc1aa4c3d2839',
              title: '해외여행',
              listNum: 3,
            },
            {
              id: '62bbb80d9d5dc1aa4c3d2839',
              title: '엠티, 수련회',
              listNum: 1,
            },
          ],
        },
      });
    }, 500),
  );
};

export const fetchEditFolderName = async (
  request: AxiosInstance,
  info: EditFolderNameInput,
): Promise<EditFolderNameOutput> => {
  return new Promise((r) =>
    setTimeout(() => {
      r({
        status: 200,
        success: true,
        message: '폴더 수정 성공',
        data: {
          aloneFolders: [
            {
              id: '62bbb80d9d5dc1aa4c3d2839',
              title: '국내여행',
              listNum: 3,
            },
            {
              id: '62bbb80d9d5dc1aa4c3d2839',
              title: '본가갈 때 챙겨',
              listNum: 5,
            },
          ],
          togetherFolders: [
            {
              id: '62bbb80d9d5dc1aa4c3d2839',
              title: '해외여행',
              listNum: 3,
            },
            {
              id: '62bbb80d9d5dc1aa4c3d2839',
              title: '엠티, 수련회',
              listNum: 1,
            },
          ],
        },
      });
    }, 500),
  );
};

export const fetchDeleteFolder = async (request: AxiosInstance): Promise<DeleteFolderOutput> => {
  return new Promise((r) =>
    setTimeout(() => {
      r({
        status: 200,
        success: true,
        message: '폴더 삭제 성공',
        data: {
          aloneFolders: [
            {
              id: '62bbb80d9d5dc1aa4c3d2839',
              title: '국내여행',
              listNum: 3,
            },
            {
              id: '62bbb80d9d5dc1aa4c3d2839',
              title: '본가갈 때 챙겨',
              listNum: 5,
            },
          ],
          togetherFolders: [
            {
              id: '62bbb80d9d5dc1aa4c3d2839',
              title: '해외여행',
              listNum: 3,
            },
            {
              id: '62bbb80d9d5dc1aa4c3d2839',
              title: '엠티, 수련회',
              listNum: 1,
            },
          ],
        },
      });
    }, 500),
  );
};

export const fetchRecentPackingList = async (
  request: AxiosInstance,
): Promise<GetRecentPackingListOutput> => {
  return new Promise((r) =>
    setTimeout(() => {
      r({
        status: 200,
        success: true,
        message: '폴더 속 함께 패킹리스트 조회 성공',
        data: {
          id: '62bbb80d9d5dc1aa4c3d2839',
          title: '혼자 밀라노 여행',
          remainDay: 5,
          packTotalNum: 20,
          packRemainNum: 3,
          isAloned: true,
        },
      });
    }, 500),
  );
};