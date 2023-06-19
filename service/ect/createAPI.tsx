import { GetTemplateInput, GetTemplateOutput } from './index';
import { GetAloneTemplateListOutput, GetTogetherTemplateListOutput } from '.';
import {
  fetchAloneTemplateList,
  fetchTemplate,
  fetchTogetherTemplateList,
} from '../../utils/axios/ect';

export interface EctAPI {
  getTemplate: (payload: GetTemplateInput) => Promise<GetTemplateOutput>;
  getAloneTemplateList: () => Promise<GetAloneTemplateListOutput>;
  getTogetherTemplateList: () => Promise<GetTogetherTemplateListOutput>;
}

const createEctAPI = (): EctAPI => {
  return {
    getTemplate: (payload) => fetchTemplate(payload),
    getAloneTemplateList: () => fetchAloneTemplateList(),
    getTogetherTemplateList: () => fetchTogetherTemplateList(),
  };
};

export default createEctAPI;
