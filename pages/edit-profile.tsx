import Header from '../components/common/Header';
import styled from 'styled-components';
import tempBox from '../public/assets/svg/tempBox.svg';
import Image from 'next/image';
import { packmanColors } from '../styles/color';
import iToggleOff from '../public/assets/svg/iToggleOff.svg';
import iToggleOn from '../public/assets/svg/iToggleOn.svg';
import { useState } from 'react';

function EditProfile() {
  const [toggle, setToggle] = useState(false);

  return (
    <StyledRoot>
      <Header back title="MY" />
      <StyledEditProfileWrapper>
        <p>로그아웃</p>
        <p>수정</p>

        <StyledProfile>
          <Image alt="프로필 이미지" src={tempBox} />
          <div>
            <h1>팩맨이</h1>
            <p>packing-e@gmail.com</p>
          </div>
        </StyledProfile>
        <div style={{ borderBottom: `1px solid ${packmanColors.gray}`, width: '100%' }}></div>

        <StyledEtc gap={0.72} paddingTop={2.95} borderBottom={true}>
          <h1>설정</h1>
          <StyledToggleWrapper>
            <p>알림설정</p>
            <StyledToggleButton
              alt="토글버튼"
              src={toggle ? iToggleOn : iToggleOff}
              width={40}
              height={40}
              layout="fixed"
              onClick={() => setToggle((prev) => !prev)}
            />
          </StyledToggleWrapper>
        </StyledEtc>
        <StyledEtc gap={1.2} paddingTop={2.95} borderBottom={true}>
          <h1>고객센터</h1>
          <StyledEtcWrapper>
            <p>문의하기</p>
            <p>서비스 피드백</p>
          </StyledEtcWrapper>
        </StyledEtc>
        <StyledEtc gap={1.2} paddingTop={3.1} borderBottom={false}>
          <h1>About 팩맨</h1>
          <StyledEtcWrapper>
            <p>함께하는 사람들</p>
            <p>약관 및 정책</p>
          </StyledEtcWrapper>
        </StyledEtc>
      </StyledEditProfileWrapper>
    </StyledRoot>
  );
}

export default EditProfile;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  width: 100%;
`;

const StyledEditProfileWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 5.113rem;

  & > p:first-child {
    position: absolute;
    top: -3.5rem;
    right: 0.5rem;
    color: ${packmanColors.darkGray};
    font-weight: 600;
    font-size: 1.4rem;
  }
  & > p:nth-child(2) {
    position: absolute;
    top: 0.5rem;
    right: 1.5rem;
    color: ${packmanColors.deepGray};
    font-weight: 600;
    font-size: 1.2rem;
  }
`;
const StyledProfile = styled.div`
  display: flex;
  padding: 1.6rem;
  gap: 2.4rem;
  background-color: ${packmanColors.blueGray};
  width: 100%;
  border-radius: 0.8rem;
  margin-bottom: 0.8rem;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2.6rem;
    color: ${packmanColors.black};
    & > h1 {
      font-weight: 600;
      font-size: 1.8rem;
    }
    & > p {
      font-weight: 400;
      font-size: 1.3rem;
    }
  }
`;
const StyledToggleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > p {
    width: fit-content;
    font-size: 1.6rem;
    font-weight: 400;
  }
`;
const StyledToggleButton = styled(Image)`
  width: 4rem;
`;

const StyledEtc = styled.div<{ gap: number; paddingTop: number; borderBottom: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${({ paddingTop }) => paddingTop}rem 0.75rem 1.9rem 1.6rem;
  border-bottom: ${({ borderBottom }) => borderBottom && `1px solid ${packmanColors.gray}`};

  gap: ${({ gap }) => `${gap}rem`};

  & > h1 {
    color: ${packmanColors.black};
    font-weight: 600;
    font-size: 1.8rem;
  }
`;
const StyledEtcWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  gap: 0.8rem;
  & > p {
    font-size: 1.6rem;
    font-weight: 400;
  }
`;
