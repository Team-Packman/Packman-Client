import { fetchTemplate, fetchTemplateList, fetchHelpTemplate } from './../../utils/axios/ect/mock';
import { GetTemplateListOutput, GetTemplateOutput, GetHelpTemplateOutput } from './index';

import { AxiosInstance } from 'axios';
import withAuth from '../../utils/axios/withAuth';

export interface EctAPI {
  getTemplateList: () => Promise<GetTemplateListOutput>;
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
