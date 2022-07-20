import { AxiosInstance } from 'axios';
import { GetAloneTemplateListOutput, GetTogetherTemplateListOut } from '.';
import { fetchAloneTemplateList, fetchTogetherTemplateList } from '../../utils/axios/ect';
import withAuth from '../../utils/axios/withAuth';

export interface EctAPI {
  getAloneTemplateList: () => Promise<GetAloneTemplateListOutput>;
  getTogetherTemplateList: () => Promise<GetTogetherTemplateListOut>;
}

export const createEctAPI = (request: AxiosInstance): EctAPI => {
  return {
    getAloneTemplateList: () => fetchAloneTemplateList(withAuth(request)),
    getTogetherTemplateList: () => fetchTogetherTemplateList(withAuth(request)),
  };
};
