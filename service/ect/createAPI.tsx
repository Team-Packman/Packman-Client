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

const createEctAPI = (request: AxiosInstance): EctAPI => {
  const authReq = request;
  return {
    getTemplate: (paylod: GetTemplateInput) => fetchTemplate(authReq, paylod),
    getAloneTemplateList: () => fetchAloneTemplateList(authReq),
    getTogetherTemplateList: () => fetchTogetherTemplateList(authReq),
  };
};

export default createEctAPI;
