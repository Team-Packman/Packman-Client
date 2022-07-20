import { GetTemplateInput } from './../../../service/ect/index';
import { AxiosInstance } from 'axios';
import {
  GetAloneTemplateListOutput,
  GetTemplateOutput,
  GetTogetherTemplateListOutput,
} from '../../../service/ect/index';

export const fetchTemplate = async (
  request: AxiosInstance,
  { templateId, type }: GetTemplateInput,
): Promise<GetTemplateOutput> => {
  const { data } = await request(`/template/${templateId}/${type}`);
  return data;
};

export const fetchAloneTemplateList = async (
  request: AxiosInstance,
): Promise<GetAloneTemplateListOutput> => {
  const { data } = await request(`/template/alone`);
  return data;
};

export const fetchTogetherTemplateList = async (
  request: AxiosInstance,
): Promise<GetTogetherTemplateListOutput> => {
  const { data } = await request(`/template/together`);
  return data;
};
