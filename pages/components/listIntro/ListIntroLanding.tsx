import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../../../components/common/Header';
import { packmanColors } from '../../../styles/color';

function ListIntroLanding() {
  const [folderName, setFolderName] = useState<string>('');
  const [selectedTagIndex, setSelectedTagIndex] = useState<number>(-1);
  const [isValidListName, setIsValidName] = useState<boolean>(false);

  const tempArr = [
    { id: '1', title: '국내여행' },
    { id: '2', title: '어학연수' },
    { id: '3', title: '콘서트' },
    { id: '4', title: '제주 한달 살이' },
    { id: '5', title: '엠티' },
  ];

  const getTodayDate = () => {
    const current = new Date();
    current.setDate(current.getDate() + 1);
    const date = current.toISOString().substring(0, 10);
    return date;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };

  const handleClick = () => {
    console.log('생성 버튼 클릭', folderName);
  };

  const handleTagClick = (index: number) => {
    console.log('tag clicked', index);
    setSelectedTagIndex(index);
  };

  return (
    <StyledRoot>
      <Header back title="리스트 작성하기" />
      <StyledDataContainer>
        <h3>언제 출발하시나요?</h3>
        <input type="date" defaultValue={getTodayDate()} />
      </StyledDataContainer>
      <StyledFolderContainer>
        <h3>폴더를 선택해주세요</h3>
        <div>
          <input
            type="text"
            onChange={handleChange}
            placeholder="폴더 이름을 입력하세요"
            maxLength={10}
          />
          <button onClick={handleClick}>생성</button>
        </div>
        <StyledTagContainer>
          {tempArr.map((v, index) => (
            <StyledTag
              key={v.id}
              isSelected={index === selectedTagIndex}
              onClick={() => handleTagClick(index)}
            >
              {v.title}
            </StyledTag>
          ))}
        </StyledTagContainer>
      </StyledFolderContainer>
      <StyledListNameContainer>
        <h3>리스트 이름을 작성해주세요</h3>
        <div>
          {!isValidListName && <label>중복된 리스트 이름입니다</label>}
          <input
            type="text"
            onChange={handleChange}
            placeholder="예시) 혼자 캐나다 여행"
            maxLength={12}
          />
        </div>
      </StyledListNameContainer>
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
