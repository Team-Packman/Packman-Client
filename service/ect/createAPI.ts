import { fetchTemplate, fetchTemplateList, fetchHelpTemplate } from './../../utils/axios/ect/index';
import {
  GetTemplateListOutput,
  GetTemplateOutput,
  GetHelpTemplateOutput,
  GetTemplateInput,
} from './index';

import { AxiosInstance } from 'axios';
import withAuth from '../../utils/axios/withAuth';

export interface EctAPI {
  getTemplateList: () => Promise<GetTemplateListOutput>;
  getTemplate: (payload: GetTemplateInput) => Promise<GetTemplateOutput>;
  getHelpTemplate: () => Promise<GetHelpTemplateOutput>;
}

export const createEctAPI = (request: AxiosInstance): EctAPI => {
  return {
    getTemplateList: () => fetchTemplateList(withAuth(request)),
    getTemplate: (payload: GetTemplateInput) => fetchTemplate(withAuth(request), payload),
    getHelpTemplate: () => fetchHelpTemplate(withAuth(request)),
  };
};
