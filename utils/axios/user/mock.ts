import { AxiosInstance } from 'axios';
import {
  GetUserInfoOutput,
  DeleteUserInfoOutput,
  UpdateUserProfileInput,
  UpdateUserProfileOutput,
} from './../../../service/user/index';
export const fetchUserInfo = async (request: AxiosInstance): Promise<GetUserInfoOutput> => {
  return new Promise((r) =>
    setTimeout(() => {
      r({
        status: 200,
        success: true,
        message: '유저 조회 성공',
        data: {
          _id: 'aksdflwekf',
          name: '팩맨이',
          email: 'una14@gmail.com',
          profileImageId: '3',
        },
      });
    }, 500),
  );
};

export const fetchDeleteUserInfo = async (
  request: AxiosInstance,
): Promise<DeleteUserInfoOutput> => {
  return new Promise((r) =>
    setTimeout(() => {
      r({
        status: 200,
        success: true,
        message: '회원 탈퇴 성공',
        data: {
          id: 'dsfadfdfsf',
        },
      });
    }, 500),
  );
};

export const fetchUpdateUserProfile = async (
  request: AxiosInstance,
  info: UpdateUserProfileInput,
): Promise<UpdateUserProfileOutput> => {
  return new Promise((r) =>
    setTimeout(() => {
      r({
        status: 200,
        success: true,
        message: '유저 생성 성공',
        data: {
          _id: 'sdfskdjfhdjhfk',
          name: '김팩맨',
          email: 'slkdfj@gmail.com',
          profileImageId: '1',
        },
      });
    }, 500),
  );
};
