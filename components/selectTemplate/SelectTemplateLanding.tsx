import styled from 'styled-components';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import useAPI from '../../utils/hooks/useAPI';
import Template from './Template';
import Layout from '../common/Layout';
import Link from 'next/link';
import CustomImage from '../common/CustomImage';
import Button from '../common/Button';
import useBoolean from '../../utils/hooks/common/useBoolean';
import { basicTemplateImageList, randomImageList } from '../../utils/constant/select-template';
import { packmanColors } from '../../styles/color';

interface Itemplate {
  id: string;
  title: string;
}

function SelectTemplateLanding() {
  const router = useRouter();
  const { type, folderId } = router.query;

  const [isActive, seIsActiveTrue, setIsActiveFalse] = useBoolean(false);
  const [templateImageIndex, setTemplateImageIndex] = useState('');
  const [templateType, setTemplateType] = useState('');
  const [templateId, setTemplateId] = useState('');
  const [isBasic, setIsBasic] = useState<boolean | null>(null);

  // api call
  const getTogetherTemplateList = useAPI((api) => api.ect.getTogetherTemplateList);
  const getAloneTemplateList = useAPI((api) => api.ect.getAloneTemplateList);
  const { data: togetherTemplateList } = useQuery('togetherTemplateList', getTogetherTemplateList);
  const { data: aloneTemplateList } = useQuery('aloneTemplateList', getAloneTemplateList);

  const templateList = type === 'alone' ? aloneTemplateList : togetherTemplateList;
  if (!templateList) return null;

  const { basicTemplate, myTemplate } = templateList.data;

  const changeTemplateImage = (template: Itemplate[], templateId: string, templateType: string) => {
    setIsBasic(templateType === 'myTemplate' ? false : true);
    template.forEach(({ id }, idx) => {
      if (id === templateId) {
        setTemplateImageIndex(idx + '');
        setTemplateType(templateType);
        templateType === 'myTemplate' && setTemplateImageIndex(Math.floor(Math.random() * 4) + '');
      }
    });
  };

  const activateConfirmButtonHandler = () => seIsActiveTrue();
  const deactivateConfirmButtonHandler = () => setIsActiveFalse();
  const setTemplateIdHandler = (templateId: string) => setTemplateId(templateId);

  return (
    <Layout back title="템플릿 선택하기" padding>
      <StyledRoot>
        <StyledTemplateWrapper>
          <StyledPicture>
            {(basicTemplateImageList[+templateImageIndex] ||
              randomImageList[+templateImageIndex]) && (
              <CustomImage
                src={
                  templateType === 'basic'
                    ? basicTemplateImageList[+templateImageIndex]
                    : randomImageList[+templateImageIndex]
                }
                placeholder="blur"
                alt="template-image"
                layout="fill"
                priority
              />
            )}
          </StyledPicture>
          <Template
            isAloned={type === 'alone'}
            basicTemplate={basicTemplate}
            myTemplate={myTemplate}
            activate={(isSelected: string) =>
              isSelected === '' ? deactivateConfirmButtonHandler() : activateConfirmButtonHandler()
            }
            changeTemplateImage={(
              template: Itemplate[],
              templateId: string,
              templateType: string,
            ) => changeTemplateImage(template, templateId, templateType)}
            setTemplateId={(templateId: string) => setTemplateIdHandler(templateId)}
          />
        </StyledTemplateWrapper>

        <StyledButtonWrapper>
          <Link href={`/list-intro?id=&type=${type}&folderId=${folderId}`}>
            <Button color={packmanColors.pmBlack} background={packmanColors.pmWhite}>
              건너뛰기
            </Button>
          </Link>
          <Link
            href={`/preview?id=${templateId}&type=${type}&folderId=${folderId}&isBasic=${isBasic}`}
          >
            <Button disabled={!isActive}>확인</Button>
          </Link>
        </StyledButtonWrapper>
      </StyledRoot>
    </Layout>
  );
}

export default SelectTemplateLanding;
const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 100%;
`;
const StyledTemplateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;
const StyledPicture = styled.picture`
  position: relative;
  aspect-ratio: 3.75 / 2.11;
  width: 100%;
  max-width: 50rem;
  margin: 0rem 0 3.3rem 0;

  & > span {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;
const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  width: calc(100vw - 4rem);
  height: 4rem;
  margin-bottom: 3.3rem;
  background-color: #fff;
  & button:not(:last-child) {
    margin-right: 1.2rem;
  }
`;
