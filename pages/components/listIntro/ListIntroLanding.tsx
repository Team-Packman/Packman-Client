import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';
import Header from '../../../components/common/Header';
import { AddFolderInput } from '../../../service/folder';
import { AddPakingListIntroInput } from '../../../service/packingList/alone';
import { packmanColors } from '../../../styles/color';
import useAPI from '../../../utils/hooks/useAPI';

interface ListIntroProps {
  isAloned: boolean;
}

function ListIntroLanding(props: ListIntroProps) {
  const { isAloned = true } = props;

  const queryClient = useQueryClient();
  const router = useRouter();

  const [date, setDate] = useState<string>('2022-07-16');
  const [folderName, setFolderName] = useState<string>('');
  const [selectedTagIndex, setSelectedTagIndex] = useState<{ id: string; index: number }>({
    id: '',
    index: -1,
  });
  const [listName, setListName] = useState<string>('');

  const getFolders = useAPI((api) => api.folder.getFolders);
  const addIntroFolder = useAPI((api) => api.packingList.alone.addIntroFolder);
  const addFolder = useAPI((api) => api.folder.addFolder);

  // 연결한 api
  const getAloneFolder = useAPI((api) => api.packingList.alone.getAloneFolder);

  const { data: aloneFolderData } = useQuery('aloneFolder', () => getAloneFolder());

  const { data } = useQuery('folderList', () => getFolders(), {
    suspense: true,
  });
  const { mutate: addIntroMutate, isError } = useMutation(
    'addIntroFolder',
    (info: AddPakingListIntroInput) => addIntroFolder(info),
  );
  const { mutate: addFolerMutate } = useMutation('addFolderName', (info: AddFolderInput) =>
    addFolder(info),
  );

  if (!data || !aloneFolderData) return null;

  const { aloneFolders, togetherFolders } = data.data;

  const getTodayDate = () => {
    const current = new Date();
    current.setDate(current.getDate() + 1);
    const date = current.toISOString().substring(0, 10);
    return date;
  };

  const handleFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleListNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListName(e.target.value);
  };

  // 폴더 생성 버튼 클릭
  const handleAddFolder = () => {
    addFolerMutate(
      { title: folderName, isAloned },
      {
        onSuccess: () => {
          queryClient.setQueryData('folderList', (oldData: any) => {
            return {
              ...oldData,
              data: {
                aloneFolders,
                togetherFolders,
              },
            };
          });
        },
      },
    );
  };

  const handleTagClick = (id: string, index: number) => {
    setSelectedTagIndex({ id, index });
  };

  const handleNextButtonClick = () => {
    addIntroMutate(
      { departureDate: date, folderId: selectedTagIndex.id, title: listName },
      {
        onSuccess: () => {
          router.push(`/packingList/${isAloned ? 'alone' : 'together'}/category`);
        },
      },
    );
  };

  return (
    <StyledRoot>
      <Header back title="리스트 작성하기" />
      <StyledDataContainer>
        <h3>언제 출발하시나요?</h3>
        <input type="date" onChange={handleDateChange} defaultValue={getTodayDate()} />
      </StyledDataContainer>
      <StyledFolderContainer>
        <h3>폴더를 선택해주세요</h3>
        <div>
          <input
            type="text"
            onChange={handleFolderNameChange}
            placeholder="폴더 이름을 입력하세요"
            maxLength={10}
          />
          <button onClick={handleAddFolder}>생성</button>
        </div>
        <StyledTagContainer>
          {isAloned
            ? aloneFolders?.map((v, index) => (
                <StyledTag
                  key={v._id}
                  isSelected={index === selectedTagIndex.index}
                  onClick={() => handleTagClick(v._id, index)}
                >
                  {v.title}
                </StyledTag>
              ))
            : togetherFolders.map((v, index) => (
                <StyledTag
                  key={v._id}
                  isSelected={index === selectedTagIndex.index}
                  onClick={() => handleTagClick(v._id, index)}
                >
                  {v.title}
                </StyledTag>
              ))}
        </StyledTagContainer>
      </StyledFolderContainer>
      <StyledListNameContainer>
        <h3>리스트 이름을 작성해주세요</h3>
        <div>
          {isError && <label>중복된 리스트 이름입니다</label>}
          <input
            type="text"
            placeholder="예시) 혼자 캐나다 여행"
            maxLength={12}
            onChange={handleListNameChange}
          />
        </div>
      </StyledListNameContainer>
      <StyledButtonContainer>
        <StyledNextButton onClick={handleNextButtonClick}>다음 단계</StyledNextButton>
      </StyledButtonContainer>
    </StyledRoot>
  );
}

export default ListIntroLanding;

export const StyledRoot = styled.article`
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
  margin: 6.7rem auto 0 auto;

  input[type='date']::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  input[type='date'] {
    display: inline-block;
    position: relative;
    width: 100%;
    padding: 1.1rem 11rem;
    border: 1px dashed ${packmanColors.pmDashGrey};
    font-size: 1.5rem;
    font-weight: 500;
    color: ${packmanColors.pmDeepGrey};
    border-radius: 0.8rem;
  }
`;

export const StyledFolderContainer = styled.section`
  width: calc(100% - 4rem);
  margin: 3.3rem auto 0 auto;

  div {
    display: flex;
    width: 100%;

    input[type='text'] {
      display: inline-block;
      position: relative;
      padding: 1.1rem 4rem;
      border: 1px dashed ${packmanColors.pmDashGrey};
      font-size: 1.5rem;
      font-weight: 500;
      color: ${packmanColors.pmDeepGrey};
      border-radius: 0.8rem;
    }

    button {
      border: 0;
      background-color: ${packmanColors.pmWhite};
      color: ${packmanColors.pmDarkGrey};
      font-size: 1.6rem;
      font-weight: 600;
      margin-left: 1.2rem;
    }
  }
`;

export const StyledTagContainer = styled.div`
  display: flex;
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
  border: ${({ isSelected }) => (isSelected ? `1px solid ${packmanColors.pmPink}` : '0')};
  border-radius: 0.8rem;
`;

export const StyledListNameContainer = styled.section`
  width: calc(100% - 4rem);
  margin: 2.5rem auto 0 auto;

  input[type='text'] {
    display: inline-block;
    position: relative;
    padding: 1.1rem 4rem;
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

export const StyledButtonContainer = styled.section`
  position: fixed;
  bottom: 3.3rem;
  left: 2rem;
  width: calc(100% - 4rem);
`;
export const StyledNextButton = styled.button`
  width: 100%;
  padding: 1.2rem 2.9rem;
  font-size: 1.4rem;
  color: ${packmanColors.pmWhite};
  background: ${packmanColors.pmPink};
  border: none;
  border-radius: 8px;
`;
