import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import tempBox from '../../../public/assets/svg/tempBox.svg';
import { packmanColors } from '../../../styles/color';

function CreateProfile() {
  const [nickname, setNickname] = useState('');

  return (
    <StyledRoot>
      <Image src={tempBox} alt="임시네모" width={120} height={120} />
      <StyledInputWrapper>
        <StyleInput
          type="text"
          placeholder="김팩맨"
          value={nickname}
          maxLength={4}
          onChange={(e) => {
            if (nickname.length > 4) {
              setNickname((prev) => prev.substring(0, 4));
            } else {
              setNickname(e.target.value);
            }
          }}
        />
        <p>닉네임을 입력해주세요 (4자 이내)</p>
      </StyledInputWrapper>
      <StyledSelectProfileWrapper>
        {Array(6)
          .fill(1)
          .map((idx) => (
            <Image key={idx} src={tempBox} alt="임시네모" width={80} height={80} />
          ))}
      </StyledSelectProfileWrapper>
      <StyledButton type="button" isActivate={nickname.length > 0 && nickname.length < 5}>
        패킹하러 가기
      </StyledButton>
    </StyledRoot>
  );
}

export default CreateProfile;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4.84rem;
`;
const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > p {
    padding-top: 0.77rem;
    color: ${packmanColors.deepGray};
    font-weight: 400;
    font-size: 1.3rem;
  }
`;
const StyleInput = styled.input`
  width: 12rem;
  text-align: center;
  font-weight: 600;
  font-size: 1.6rem;
  color: ${packmanColors.black};
  border: none;
  border-bottom: 1px solid ${packmanColors.deepGray};
  margin-top: 1.6rem;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #dddddd;
  }
`;
const StyledSelectProfileWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 25.6rem;
  gap: 0.8rem;
  margin: 3.2rem 0 5.57rem 0;
`;
const StyledButton = styled.button<{ isActivate: boolean }>`
  width: 33.6rem;
  height: 4.1rem;
  border: none;
  border-radius: 0.8rem;
  padding: 1.2rem 6.4rem;
  font-weight: 600;
  font-size: 1.4rem;
  color: ${packmanColors.white};
  background-color: ${({ isActivate }) => (isActivate ? packmanColors.pink : packmanColors.gray)};
`;
