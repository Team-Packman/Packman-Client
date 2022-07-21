import { GetTemplateInput, GetTemplateOutput } from './index';
import { AxiosInstance } from 'axios';
import { GetAloneTemplateListOutput, GetTogetherTemplateListOutput } from '.';
import {
  fetchAloneTemplateList,
  fetchTemplate,
  fetchTogetherTemplateList,
} from '../../utils/axios/ect';
import withAuth from '../../utils/axios/withAuth';

export interface EctAPI {
  getTemplate: (payload: GetTemplateInput) => Promise<GetTemplateOutput>;
  getAloneTemplateList: () => Promise<GetAloneTemplateListOutput>;
  getTogetherTemplateList: () => Promise<GetTogetherTemplateListOutput>;
}

export const createEctAPI = (request: AxiosInstance): EctAPI => {
  return {
    getTemplate: (paylod: GetTemplateInput) => fetchTemplate(withAuth(request), paylod),
    getAloneTemplateList: () => fetchAloneTemplateList(withAuth(request)),
    getTogetherTemplateList: () => fetchTogetherTemplateList(withAuth(request)),
  };
};
