import { AxiosInstance } from 'axios';
import { GetAloneTemplateListOutput } from '.';
import { fetchAloneTemplateList } from '../../utils/axios/ect';
import withAuth from '../../utils/axios/withAuth';

export interface EctAPI {
  getAloneTemplateList: () => Promise<GetAloneTemplateListOutput>;
}

export const createEctAPI = (request: AxiosInstance): EctAPI => {
  return {
    getAloneTemplateList: () => fetchAloneTemplateList(withAuth(request)),
  };
};
