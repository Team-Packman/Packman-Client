import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';
import { packmanColors } from '../../styles/color';
import { useState } from 'react';
import Modal from '../common/Modal';
import Footer from '../common/Footer';
import { ProfileList } from '../../utils/profileImages';
import { FONT_STYLES } from '../../styles/font';
import { useResetRecoilState } from 'recoil';
import { authedUser, kakaoAccessToken } from '../../utils/recoil/atom/atom';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
interface ProfileData {
  _id: string;
  name: string;
  email: string;
  profileImageId: string;
}

interface SettingProfileProps {
  onClickEditText: () => void;
  profileData: ProfileData;
}

function SettingProfile(props: SettingProfileProps) {
  const { onClickEditText, profileData } = props;
  const { name, email, profileImageId } = profileData;
  const [toggle, setToggle] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isWithdrawn, setIsWithdrawn] = useState(false);
  const profileImage = ProfileList.map((e: StaticImageData, i: number) => ({ id: i + '', src: e }));
  const accessToken = useRecoilValue(kakaoAccessToken).accessToken;

  const onClickLeftModalButton = async () => {
    setIsWithdrawn(true);
  };

  const onClickRightModalButton = () => {
    setShowModal(false);
  };

  const resetUserState = useResetRecoilState(authedUser); //유저 전역변수 초기화

  const onClickLogout = () => {
    (async () => {
      //로그아웃
      await axios.post(
        'https://kapi.kakao.com/v1/user/logout',
        {},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    })();
    resetUserState();
  };

  return (
    <StyledRoot>
      <StyledSettingWrapper>
        <p onClick={onClickLogout}>로그아웃</p>
        <p onClick={onClickEditText}>수정</p>

        <StyledProfile>
          <Image
            src={profileImage[+profileImageId].src}
            alt="my-profile-image"
            width={80}
            height={80}
          />
          <div>
            <h1>{name}</h1>
            <p>{email}</p>
          </div>
        </StyledProfile>
        <div style={{ borderBottom: `1px solid ${packmanColors.pmGrey}`, width: '100%' }}></div>

        <StyledEtc gap={0.72} paddingTop={2.95} borderBottom={true}>
          <h1>설정</h1>
          <StyledToggleWrapper>
            <p>알림 설정</p>
            <StyledToggle isToggled={toggle} onClick={() => setToggle((prev) => !prev)}>
              <StyledToggleCircle isToggled={toggle} />
            </StyledToggle>
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

        {showModal && (
          <Modal
            title={isWithdrawn ? '탈퇴되었습니다.' : '정말 탈퇴하시겠어요? 😭'}
            closeModal={() => setShowModal(false)}
            button={
              !isWithdrawn && (
                <StyledModalButtonWrapper>
                  <StyledModalButton left={true} onClick={onClickLeftModalButton}>
                    탈퇴하기
                  </StyledModalButton>
                  <StyledModalButton onClick={onClickRightModalButton}>취소하기</StyledModalButton>
                </StyledModalButtonWrapper>
              )
            }
          />
        )}
      </StyledSettingWrapper>
      <StyledFooter>
        <Footer />
      </StyledFooter>
      <p onClick={() => setShowModal(true)}>탈퇴하기</p>
    </StyledRoot>
  );
}

export default SettingProfile;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* height: calc(var(--vh, 1vh) * 100); */
  height: fit-content;
  overflow-y: visible;

  & > p {
    display: flex;
    align-items: flex-end;
    height: 8rem;
    color: ${packmanColors.pmDeepGrey};
  }
`;

const StyledSettingWrapper = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: 5.113rem;

  & > p:first-child {
    position: absolute;
    top: -1.9rem;
    right: 0.5rem;
    color: ${packmanColors.pmDarkGrey};
    ${FONT_STYLES.BODY2_SEMIBOLD};
  }
  & > p:nth-child(2) {
    position: absolute;
    top: 0.5rem;
    right: 1.5rem;
    color: ${packmanColors.pmDeepGrey};
    ${FONT_STYLES.CAPTION2_SEMIBOLD};
  }
`;
const StyledProfile = styled.div`
  display: flex;
  align-items: center;
  padding: 1.6rem;
  gap: 2.4rem;
  background-color: ${packmanColors.pmBlueGrey};
  width: 100%;
  height: 11.2rem;
  border-radius: 0.8rem;
  margin-bottom: 0.8rem;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 6.5rem;
    color: ${packmanColors.pmBlack};
    & > h1 {
      ${FONT_STYLES.SUBHEAD2_SEMIBOLD};
    }
    & > p {
      ${FONT_STYLES.BODY1_REGULAR};
    }
  }
`;
const StyledToggleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > p {
    ${FONT_STYLES.BODY1_REGULAR};
  }
`;
const StyledToggle = styled.div<{ isToggled: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 4rem;
  height: 2.25rem;
  border-radius: 1.5rem;
  background-color: ${({ isToggled }) =>
    isToggled ? packmanColors.pmPink : packmanColors.pmDeepGrey};
`;
const StyledToggleCircle = styled.div<{ isToggled: boolean }>`
  position: absolute;
  left: 0.225rem;
  transform: ${({ isToggled }) => isToggled && 'translateX(1.75rem)'};
  width: 1.8rem;
  height: 1.8rem;

  background-color: ${packmanColors.pmWhite};
  border-radius: 50%;
  transition: 0.4s ease-in-out;
`;

const StyledEtc = styled.div<{ gap: number; paddingTop: number; borderBottom: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${({ paddingTop }) => paddingTop}rem 0.75rem 1.9rem 1.6rem;
  border-bottom: ${({ borderBottom }) => borderBottom && `1px solid ${packmanColors.pmGrey}`};

  gap: ${({ gap }) => `${gap}rem`};

  & > h1 {
    color: ${packmanColors.pmBlack};
    ${FONT_STYLES.SUBHEAD2_SEMIBOLD};
  }
`;
const StyledEtcWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  gap: 0.8rem;
  & > p {
    ${FONT_STYLES.BODY3_REGULAR};
    letter-spacing: 4%;
  }
`;
const StyledFooter = styled.div`
  display: flex;
  align-items: flex-end;
  height: calc(100vh - 74rem);
  min-height: 10.5rem;
  margin: 6.1rem 0 5rem 0;
`;
const StyledModalButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`;
const StyledModalButton = styled.button<{ left?: boolean }>`
  width: 13.5rem;
  height: 3.4rem;
  border: ${({ left }) => (left ? `1px solid ${packmanColors.pmDeepGrey}` : 'none')};
  color: ${({ left }) => (left ? packmanColors.pmDeepGrey : packmanColors.pmWhite)};
  background-color: ${({ left }) => (left ? packmanColors.pmWhite : packmanColors.pmPink)};
  border-radius: 0.8rem;
  ${FONT_STYLES.BODY4_SEMIBOLD};
`;
