import styled from 'styled-components';
import Image, { StaticImageData } from 'next/image';
import { packmanColors } from '../../styles/color';
import { useState } from 'react';
import Modal from '../common/ModalLegacy';
import Footer from '../common/Footer';
import { ProfileList } from '../../utils/profileImages';
import { FONT_STYLES } from '../../styles/font';
import { authUserAtom, kakao } from '../../utils/recoil/atom/atom';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import useAPI from '../../utils/hooks/useAPI';
import { useMutation } from 'react-query';
import useReset from '../../utils/hooks/recoil/useReset';
import iRightArrow from '/public/assets/svg/iRightArrow.svg';
interface ProfileData {
  id: string;
  nickname: string;
  email: string;
  profileImage: string;
}

interface SettingProfileProps {
  onClickEditText: () => void;
  profileData: ProfileData;
}

function SettingProfile(props: SettingProfileProps) {
  const { onClickEditText, profileData } = props;
  const { nickname, email, profileImage } = profileData;
  const [toggle, setToggle] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isWithdrawn, setIsWithdrawn] = useState(false);
  const profile = ProfileList.map((e: StaticImageData, i: number) => ({ id: i + '', src: e }));
  const [isLogoutClicked, setIsLogoutClicked] = useState(true);
  const { accessToken: kakaoAccessToken } = useRecoilValue(kakao);
  const accessToken = useRecoilValue(authUserAtom).accessToken;
  const resetAllPersist = useReset();

  const router = useRouter();

  // 탈퇴하기
  const deleteUser = useAPI((api) => api.user.deleteUserInfo);
  const { mutate: deleteUserMutate } = useMutation(
    (deleteUserData: string) => {
      setIsWithdrawn(true);
      return deleteUser(deleteUserData);
    },
    {
      onSuccess: () => {
        onClickLogout();
      },
    },
  );

  const closeModal = () => {
    setShowModal(false);
  };

  //로그아웃 및 recoil 초기화
  const onClickLogout = () => {
    (async () => {
      try {
        await axios.post(
          isLogoutClicked
            ? 'https://kapi.kakao.com/v1/user/logout'
            : 'https://kapi.kakao.com/v1/user/unlink',
          {},
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${kakaoAccessToken}`,
            },
          },
        );
      } finally {
        resetAllPersist();
        router.replace('/login');
      }
    })();
  };

  // 탈퇴하기 텍스트 클릭한 경우
  const onClickWithdrawn = () => {
    setShowModal(true);
    setIsLogoutClicked(false);
  };

  return (
    <StyledRoot>
      <StyledSettingWrapper>
        <p onClick={onClickLogout}>로그아웃</p>
        <StyledEditButton>
          <Image src={iRightArrow} alt="edit" onClick={onClickEditText} />
        </StyledEditButton>

        <StyledProfile>
          <Image
            src={profile[+profileImage].src}
            alt="my-profile-image"
            placeholder="blur"
            width={80}
            height={80}
          />
          <div>
            <h1>{nickname}</h1>
            <p>{email}</p>
          </div>
        </StyledProfile>
        <div style={{ borderBottom: `1px solid ${packmanColors.pmGrey}`, width: '100%' }}></div>

        <StyledEtc paddingTop={2.95} borderBottom={true}>
          <h1>설정</h1>
          <StyledToggleWrapper>
            <p>알림 설정</p>
            <StyledToggle
              isToggled={toggle}
              onClick={() => {
                setToggle((prev) => !prev);
                alert('준비중 입니다.\n조금만 기다려주세요🙏🏻');
              }}
            >
              <StyledToggleCircle isToggled={toggle} />
            </StyledToggle>
          </StyledToggleWrapper>
        </StyledEtc>
        <StyledEtc paddingTop={2.95} borderBottom={true}>
          <h1>고객센터</h1>
          <StyledEtcWrapper>
            <p
              onClick={() =>
                router.push(
                  'https://docs.google.com/forms/d/e/1FAIpQLSd1D1ptmYG5Ufu7y1SKDnSr-k8UIeRfSlTBFRQqX3bF-TwuQg/viewform',
                )
              }
            >
              문의하기
            </p>
            <p
              onClick={() =>
                router.push(
                  'https://docs.google.com/forms/d/e/1FAIpQLSer7bKxKKcmRU5vrMT_187cERpbA5chkzM-sjrigBsmWH9a6Q/viewform',
                )
              }
            >
              서비스 피드백
            </p>
          </StyledEtcWrapper>
        </StyledEtc>
        <StyledEtc paddingTop={3.1} borderBottom={false}>
          <h1>About 팩맨</h1>
          <StyledEtcWrapper>
            <p
              onClick={() => router.push('https://www.notion.so/1003579b6fd34fb0861040bb04fe235d')}
            >
              함께하는 사람들
            </p>
            <p
              onClick={() => router.push('https://www.notion.so/99197c3491fe477ea9d69ed131cf4087')}
            >
              약관 및 정책
            </p>
          </StyledEtcWrapper>
        </StyledEtc>

        {showModal && (
          <Modal
            title={isWithdrawn ? '탈퇴되었습니다.' : '정말 탈퇴하시겠어요? 😭'}
            closeModal={closeModal}
            button={
              !isWithdrawn && (
                <StyledModalButtonWrapper>
                  <StyledModalButton left={true} onClick={() => deleteUserMutate(accessToken)}>
                    탈퇴하기
                  </StyledModalButton>
                  <StyledModalButton onClick={closeModal}>취소하기</StyledModalButton>
                </StyledModalButtonWrapper>
              )
            }
          />
        )}
      </StyledSettingWrapper>
      <StyledFooter>
        <Footer />
      </StyledFooter>
      <p onClick={onClickWithdrawn}>탈퇴하기</p>
    </StyledRoot>
  );
}

export default SettingProfile;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  & > p {
    display: flex;
    align-items: center;
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
    top: -2.5rem;
    right: 0.5rem;
    color: ${packmanColors.pmDarkGrey};
    ${FONT_STYLES.BODY2_SEMIBOLD};
  }
`;
const StyledEditButton = styled.div`
  position: absolute;
  top: 3.75rem;
  right: 0.6rem;
  color: ${packmanColors.pmDeepGrey};
  ${FONT_STYLES.CAPTION2_SEMIBOLD};
`;
const StyledProfile = styled.div`
  display: flex;
  align-items: center;
  padding: 1.6rem;
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
    padding-left: 2.4rem;
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
    ${FONT_STYLES.BODY3_REGULAR};
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

const StyledEtc = styled.div<{ paddingTop: number; borderBottom: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${({ paddingTop }) => paddingTop}rem 0.75rem 1.9rem 1.6rem;
  border-bottom: ${({ borderBottom }) => borderBottom && `1px solid ${packmanColors.pmGrey}`};

  & > h1 {
    ${FONT_STYLES.SUBHEAD2_SEMIBOLD};
    color: ${packmanColors.pmBlack};
    margin-bottom: 1.2rem;
  }
`;
const StyledEtcWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  & > p {
    ${FONT_STYLES.BODY3_REGULAR};
    letter-spacing: 4%;
    &:not(:last-child) {
      padding-bottom: 1.5rem;
    }
  }
`;
const StyledFooter = styled.div`
  display: flex;
  align-items: flex-end;
  height: calc(100vh - 74rem);
  min-height: 10.5rem;
  margin: 2.1rem 0 5rem 0;
`;
const StyledModalButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
`;
const StyledModalButton = styled.button<{ left?: boolean }>`
  ${FONT_STYLES.BODY4_SEMIBOLD};
  width: 13.5rem;
  height: 3.4rem;
  border: ${({ left }) => (left ? `1px solid ${packmanColors.pmDeepGrey}` : 'none')};
  color: ${({ left }) => (left ? packmanColors.pmDeepGrey : packmanColors.pmWhite)};
  background-color: ${({ left }) => (left ? packmanColors.pmWhite : packmanColors.pmPink)};
  border-radius: 0.8rem;
`;
