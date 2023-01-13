import { GetTemplateOutput } from './index';
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

const createEctAPI = (): EctAPI => {
  return {
    getTemplate: (templateId: string) => fetchTemplate(templateId),
    getAloneTemplateList: () => fetchAloneTemplateList(),
    getTogetherTemplateList: () => fetchTogetherTemplateList(),
  };
};

export default createEctAPI;
