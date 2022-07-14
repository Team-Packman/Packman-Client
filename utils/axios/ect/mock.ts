import { AxiosInstance } from 'axios';
import {
  GetHelpTemplateOutput,
  GetTemplateListOutput,
  GetTemplateOutput,
} from '../../../service/ect';

export const fetchTemplateList = async (request: AxiosInstance): Promise<GetTemplateListOutput> => {
  return new Promise((r) =>
    setTimeout(() => {
      r({
        status: 200,
        success: true,
        message: '템플릿 리스트 조회 성공',
        data: {
          basicTemplate: [
            {
              id: '62bbb80d9d5dc1aa4c3d2839',
              title: '앱잼 합숙',
            },
            {
              id: '62bbb80d9d5dc1aa4c3d2839',
              title: '교환학생',
            },
          ],
          myTemplate: [
            {
              id: '62bbb80d9d5dc1aa4c3d2839',
              title: '앱잼 합숙',
            },
            {
              id: '62bbb80d9d5dc1aa4c3d2839',
              title: '엠티',
            },
          ],
        },
      });
    }, 500),
  );
};

export const fetchTemplate = async (request: AxiosInstance): Promise<GetTemplateOutput> => {
  return new Promise((r) =>
    setTimeout(() => {
      r({
        status: 200,
        success: true,
        message: '템플릿 상세조회 성공',
        data: {
          id: '62bbb80d9d5dc1aa4c3d28391231',
          title: '앱잼 합숙',
          category: [
            {
              id: '62bbb80d9d5dc1aa4c3d28131232139',
              name: '필수',
              pack: [
                {
                  id: '62bbb80d9d5dc1aa3454354c3d2839',
                  name: '여권',
                },
                {
                  id: '62bbb80d9d5dc1aa354234c3d2839',
                  name: '가방',
                },
              ],
            },
            {
              id: '62bbb80d9d5dc1aa4545435c3d2839',
              name: '의류',
              pack: [
                {
                  id: '62bbb80d9d5dc1aa4c35435565d2839',
                  name: '모자',
                },
                {
                  id: '62bbb80d9d5dc1aa4c331283210d2839',
                  name: '수영복',
                },
              ],
            },
          ],
        },
      });
    }, 500),
  );
};

export const fetchHelpTemplate = async (request: AxiosInstance): Promise<GetHelpTemplateOutput> => {
  return new Promise((r) =>
    setTimeout(() => {
      r({
        status: 200,
        success: true,
        message: '엿보기 조회 성공',
        data: {
          id: '62bbb80d9d5dc1aa4c3d2839',
          category: [
            {
              id: '62bbb80d9d5dc1aa4c3d2839',
              name: '필수',
              pack: [
                {
                  id: '62bbb80d9d5dc1aa4c3d2839',
                  name: '여권',
                },
                {
                  id: '62bbb80d9d5dc1aa4c3d2839',
                  name: '보조배터리',
                },
              ],
            },
          ],
        },
      });
    }, 500),
  );
};
