import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { AddFolderInput } from '../../../service/folder';
import {
  AddAlonePackingListIntroInput,
  GetAloneFolderOutput,
} from '../../../service/packingList/alone';
import {
  AddTogetherPackingListIntroInput,
  GetTogetherFolderOutput,
} from '../../../service/packingList/together';
import { packmanColors } from '../../../styles/color';
import useAPI from '../../../utils/hooks/useAPI';
import { listState } from '../../../utils/recoil/atom/atom';
import Layout from '../../common/Layout';

type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> };
type folderType = DeepPartial<GetTogetherFolderOutput> & DeepPartial<GetAloneFolderOutput>;

function ListIntroLanding() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id, type, folderId } = router.query;

  const setIsFresh = useSetRecoilState(listState);

  const getTodayDate = () => {
    const current = new Date();
    current.setDate(current.getDate());
    const date = current.toISOString().substring(0, 10);
    return date;
  };

  const [date, setDate] = useState<string>(getTodayDate());
  const [folderName, setFolderName] = useState<string>('');
  const [listName, setListName] = useState<string>('');
  const [selectedTagIndex, setSelectedTagIndex] = useState<{ id: string; index: number }>({
    id: '',
    index: -1,
  });
  const [isAloned, setIsAloned] = useState<boolean>(false);
  const [templateId, setTemplateId] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isKeyboardFocused, setIsKeyboardFocused] = useState<boolean>(false);

  useEffect(() => {
    if (router.isReady) {
      setTemplateId(id as string);

      switch (type) {
        case 'alone':
        case 'together': {
          setIsAloned(type === 'alone');
          return;
        }
        default:
          throw new Error();
      }
    }
  }, [router.isReady, id, type]);

  useEffect(() => {
    const checkFolderAndListValidation = () => {
      const checkIsValidate = selectedTagIndex?.index !== -1 && listName !== '';
      setIsValid(checkIsValidate);
    };
    checkFolderAndListValidation();
  }, [selectedTagIndex, listName]);

  // 폴더 내에서, 리스트 생성하기를 한 경우 자동으로 해당 폴더를 기본으로 선택하게 하는 함수
  const initSelectedFolder = useCallback(
    (data: folderType, category: string) => {
      const currentFolder = category === 'together' ? data?.data : data?.data;
      const findSelectedFolder = currentFolder?.find((v) => v?.id === folderId);

      if (findSelectedFolder) {
        const findFolderIndex = currentFolder?.findIndex((v) => v === findSelectedFolder);
        setSelectedTagIndex({
          id: findSelectedFolder.id as string,
          index: findFolderIndex as number,
        });
      }
    },
    [folderId],
  );

  //  api call
  const getAloneFolder = useAPI((api) => api.packingList.alone.getAloneFolder);
  const getTogetherFolder = useAPI((api) => api.packingList.together.getTogetherFolder);
  const addAlonePackingListFolder = useAPI(
    (api) => api.packingList.alone.addAlonePackingListFolder,
  );
  const addTogetherPackingListFolder = useAPI(
    (api) => api.packingList.together.addTogetherPackingListFolder,
  );
  const addFolder = useAPI((api) => api.folder.addFolder);

  const { data: aloneFolderData } = useQuery('aloneFolder', () => getAloneFolder());
  const { data: togetherFolderData } = useQuery('togetherFolder', () => getTogetherFolder());

  useEffect(() => {
    if (aloneFolderData) {
      initSelectedFolder(aloneFolderData, 'alone');
    }
  }, [aloneFolderData, initSelectedFolder]);

  useEffect(() => {
    if (togetherFolderData) {
      initSelectedFolder(togetherFolderData, 'together');
    }
  }, [togetherFolderData, initSelectedFolder]);

  const { mutate: addAloneIntroMutate } = useMutation(
    'addAloneIntroFolder',
    (info: AddAlonePackingListIntroInput) => addAlonePackingListFolder(info),
  );
  const { mutate: addTogetherIntroMutate } = useMutation(
    'addTogetherIntroFolder',
    (info: AddTogetherPackingListIntroInput) => addTogetherPackingListFolder(info),
  );

  const { mutate: addFolerMutate } = useMutation((info: AddFolderInput) => addFolder(info));

  if (!aloneFolderData || !togetherFolderData) return null;

  const aloneFolder = aloneFolderData.data;
  const togetherFolder = togetherFolderData.data;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };

  const handleListNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value);
  };

  const handleKeyboardFocus = () => {
    setIsKeyboardFocused(true);
  };

  const handleKeyboardBlur = () => {
    setIsKeyboardFocused(false);
  };

  // 폴더 생성 버튼 클릭
  const handleAddFolder = () => {
    addFolerMutate(
      { name: folderName, isAloned },
      {
        onSuccess: (data) => {
          {
            isAloned
              ? queryClient.setQueryData('aloneFolder', (oldData: any) => {
                  return {
                    ...oldData,
                    data: data.data.aloneFolder,
                  };
                })
              : queryClient.setQueryData('togetherFolder', (oldData: any) => {
                  return {
                    ...oldData,
                    data: data.data.togetherFolder,
                  };
                });
          }
        },
      },
    );
    setFolderName('');
  };

  const handleTagClick = (id: string, index: number) => {
    // 처음 선택하는 경우
    if (!selectedTagIndex.id) {
      setSelectedTagIndex({ id, index });
    } else {
      // 이미 선택한 태그를 한번 더 클릭한 경우
      if (id === selectedTagIndex.id) {
        setSelectedTagIndex({ id: '', index: -1 });
      } else {
        setSelectedTagIndex({ id, index });
      }
    }
  };

  const handleNextButtonClick = () => {
    {
      isAloned
        ? addAloneIntroMutate(
            {
              departureDate: date,
              folderId: selectedTagIndex.id,
              title: listName,
              templateId: templateId,
            },
            {
              onSuccess: (data) => {
                router.push(`/alone?id=${data?.data?.id}`);
              },
            },
          )
        : addTogetherIntroMutate(
            {
              departureDate: date,
              folderId: selectedTagIndex.id,
              title: listName,
              templateId: templateId,
            },
            {
              onSuccess: (data) => {
                router.push(`/together?id=${data?.data?.id}`);
                setIsFresh({ isFresh: true });
              },
            },
          );
    }
  };

  return (
    <Layout back title="리스트 작성하기">
      <StyledBody>
        <StyledDataContainer>
          <h3>언제 출발하시나요?</h3>
          <StyledDate type="date" onChange={handleDateChange} defaultValue={getTodayDate()} />
        </StyledDataContainer>
        <StyledFolderContainer>
          <h3>폴더를 선택해주세요</h3>
          <StyledFolderInputContent>
            <input
              type="text"
              onChange={(e) => handleFolderNameChange(e)}
              onFocus={handleKeyboardFocus}
              onBlur={handleKeyboardBlur}
              value={folderName}
              placeholder="폴더 이름을 입력하세요"
              maxLength={10}
            />
            <button onClick={handleAddFolder}>생성</button>
          </StyledFolderInputContent>
          <StyledTagContainer>
            {isAloned
              ? aloneFolder?.map((v, index) => (
                  <StyledTag
                    key={v.id}
                    isSelected={index === selectedTagIndex.index}
                    onClick={() => handleTagClick(v.id, index)}
                  >
                    {v.name}
                  </StyledTag>
                ))
              : togetherFolder?.map((v, index) => (
                  <StyledTag
                    key={v.id}
                    isSelected={index === selectedTagIndex.index}
                    onClick={() => handleTagClick(v.id, index)}
                  >
                    {v.name}
                  </StyledTag>
                ))}
          </StyledTagContainer>
        </StyledFolderContainer>
        <StyledListNameContainer>
          <h3>리스트 이름을 작성해주세요</h3>
          <div>
            <input
              type="text"
              placeholder="예시) 혼자 캐나다 여행"
              maxLength={12}
              onChange={handleListNameChange}
              onFocus={handleKeyboardFocus}
              onBlur={handleKeyboardBlur}
            />
          </div>
        </StyledListNameContainer>
        <StyledButtonContainer isKeyboardFocused={isKeyboardFocused}>
          <StyledNextButton onClick={handleNextButtonClick} disabled={!isValid}>
            다음 단계
          </StyledNextButton>
        </StyledButtonContainer>
      </StyledBody>
    </Layout>
  );
}

export default ListIntroLanding;

export const StyledBody = styled.article`
  width: 100%;
  height: 100%;

  h3 {
    color: ${packmanColors.pmBlack};
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 2.5rem;
  }
`;

export const StyledDataContainer = styled.section`
  width: calc(100% - 4rem);
  margin: 3rem auto 0 auto;
`;

export const StyledDate = styled.input`
  -webkit-appearance: none;
  display: inline-block;
  position: relative;
  width: 100%;
  padding: 1.1rem 0;
  text-align: center;
  border: 1px dashed ${packmanColors.pmDashGrey};
  font-size: 1.5rem;
  font-weight: 500;
  color: ${packmanColors.pmDeepGrey};
  border-radius: 0.8rem;
  background-color: ${packmanColors.pmWhite};

  ::-webkit-datetime-edit-text,
  ::-webkit-datetime-edit-month-field,
  ::-webkit-datetime-edit-day-field,
  ::-webkit-datetime-edit-year-field {
    -webkit-appearance: none;
    color: ${packmanColors.pmDeepGrey};
    background-color: ${packmanColors.pmWhite};
  }

  ::-webkit-calendar-picker-indicator {
    background: rgba(0, 0, 0, 0);
    color: rgba(0, 0, 0, 0);
    opacity: 1;
    cursor: pointer;
    height: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
`;

export const StyledFolderContainer = styled.section`
  width: calc(100% - 4rem);
  margin: 3.3rem auto 0 auto;
`;

export const StyledFolderInputContent = styled.div`
  display: flex;
  width: 100%;

  input[type='text'] {
    display: inline-block;
    position: relative;
    padding: 1.1rem 0 1.1rem 1.6rem;
    border: 1px dashed ${packmanColors.pmDashGrey};
    font-size: 1.5rem;
    font-weight: 500;
    color: ${packmanColors.pmDeepGrey};
    border-radius: 0.8rem;
    flex: 2;
  }

  button {
    border: 0;
    background-color: ${packmanColors.pmWhite};
    color: ${packmanColors.pmDarkGrey};
    font-size: 1.6rem;
    font-weight: 600;
    margin-left: 1rem;
    flex: 0 1 auto;
  }
`;

export const StyledTagContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 1.2rem;
`;

export const StyledTag = styled.span<{ isSelected: boolean }>`
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ isSelected }) =>
    isSelected ? `${packmanColors.pmPink}` : `${packmanColors.pmDarkGrey}`};
  padding: 0.8rem;
  width: fit-content;
  line-height: 1.5rem;
  margin-right: 0.5rem;
  margin-bottom: 1.3rem;
  background: ${({ isSelected }) =>
    isSelected ? `${packmanColors.pmWhite}` : `${packmanColors.pmBlueGrey}`};
  border: ${({ isSelected }) =>
    isSelected ? `1px solid ${packmanColors.pmPink}` : `1px solid ${packmanColors.pmBlueGrey}`};
  border-radius: 0.8rem;
`;

export const StyledListNameContainer = styled.section`
  width: calc(100% - 4rem);
  margin: 2.5rem auto 0 auto;

  input[type='text'] {
    display: inline-block;
    position: relative;
    padding: 1.1rem 0 1.1rem 1.6rem;
    border: 1px dashed ${packmanColors.pmDashGrey};
    font-size: 1.5rem;
    font-weight: 500;
    color: ${packmanColors.pmDeepGrey};
    border-radius: 0.8rem;
    width: 100%;
  }

  input[type='text']:focus {
    outline: none !important;
    border: 1px dashed ${packmanColors.pmPink};
  }

  h3 {
    margin-bottom: 0.8rem;
  }

  label {
    font-size: 1.2rem;
    color: ${packmanColors.pmPink};
  }
`;

export const StyledButtonContainer = styled.section<{ isKeyboardFocused: boolean }>`
  position: fixed;
  ${(props) => props.isKeyboardFocused && 'display: none;'}
  bottom: 3.3rem;
  left: 2rem;
  width: calc(100% - 4rem);
  z-index: 1500;
`;
export const StyledNextButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  padding: 1.2rem 2.9rem;
  font-size: 1.4rem;
  color: ${({ disabled }) =>
    disabled ? `${packmanColors.pmDeepGrey}` : `${packmanColors.pmWhite}`};
  background: ${({ disabled }) =>
    disabled ? `${packmanColors.blueGray}` : `${packmanColors.pmPink}`};
  border: none;
  border-radius: 8px;
`;
