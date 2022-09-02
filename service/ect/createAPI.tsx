import { GetTemplateOutput } from './index';
import { AxiosInstance } from 'axios';
import { GetAloneTemplateListOutput, GetTogetherTemplateListOutput } from '.';
import {
  fetchAloneTemplateList,
  fetchTemplate,
  fetchTogetherTemplateList,
} from '../../utils/axios/ect';

export interface EctAPI {
  getTemplate: (templateId: string) => Promise<GetTemplateOutput>;
  getAloneTemplateList: () => Promise<GetAloneTemplateListOutput>;
  getTogetherTemplateList: () => Promise<GetTogetherTemplateListOutput>;
}

const createEctAPI = (request: AxiosInstance): EctAPI => {
  return {
    getTemplate: (templateId: string) => fetchTemplate(request, templateId),
    getAloneTemplateList: () => fetchAloneTemplateList(request),
    getTogetherTemplateList: () => fetchTogetherTemplateList(request),
  };
};

export default createEctAPI;
