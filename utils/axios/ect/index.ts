import { GetTemplateInput } from './../../../service/ect/index';
import { client } from '..';
import {
  GetAloneTemplateListOutput,
  GetTemplateOutput,
  GetTogetherTemplateListOutput,
} from '../../../service/ect/index';

export const fetchTemplate = async ({
  templateId,
  isBasic,
}: GetTemplateInput): Promise<GetTemplateOutput> => {
  const { data } = await client(`/template/${templateId}?isBasic=${isBasic}`);
  return data;
};

export const fetchAloneTemplateList = async (): Promise<GetAloneTemplateListOutput> => {
  const { data } = await client(`/template/alone`);
  return data;
};

export const fetchTogetherTemplateList = async (): Promise<GetTogetherTemplateListOutput> => {
  const { data } = await client(`/template/together`);
  return data;
};
