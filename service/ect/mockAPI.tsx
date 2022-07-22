import { fetchTemplate, fetchTemplateList, fetchHelpTemplate } from '../../utils/axios/ect/mock';
import { GetTemplateOutput, GetHelpTemplateOutput, GetTogetherTemplateListOutput } from './index';

import { AxiosInstance } from 'axios';
import withAuth from '../../utils/axios/withAuth';

export interface EctAPI {
  getTemplateList: () => Promise<GetTogetherTemplateListOutput>;
  getTemplate: () => Promise<GetTemplateOutput>;
  getHelpTemplate: () => Promise<GetHelpTemplateOutput>;
}

export const createEctAPI = (request: AxiosInstance): EctAPI => {
  return {
    getTemplateList: () => fetchTemplateList(withAuth(request)),
    getTemplate: () => fetchTemplate(withAuth(request)),
    getHelpTemplate: () => fetchHelpTemplate(withAuth(request)),
  };
};
