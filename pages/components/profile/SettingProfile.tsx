import styled from 'styled-components';
import Image from 'next/image';
import tempBox from '../../../public/assets/svg/tempBox.svg';
import { packmanColors } from '../../../styles/color';
import iToggleOff from '../../../public/assets/svg/iToggleOff.svg';
import iToggleOn from '../../../public/assets/svg/iToggleOn.svg';
import { useState } from 'react';
import Modal from '../common/Modal';
import useAPI from '../../../utils/hooks/useAPI';

interface ProfileData {
  id: string;
  nickname: string;
  email: string;
  profileImageId: string;
}

interface SettingProfileProps {
  onClickEditText: () => void;
  profileData: ProfileData;
}

function SettingProfile(props: SettingProfileProps) {
  const { onClickEditText, profileData } = props;
  const { id, nickname, email, profileImageId } = profileData;
  const [toggle, setToggle] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const deleteUserInfo = useAPI((api) => api.user.deleteUserInfo);
  const [isWithdrawn, setIsWithdrawn] = useState(false);

  return (
    <StyledRoot>
      <p>로그아웃</p>
      <p onClick={onClickEditText}>수정</p>

      <StyledProfile>
        <Image alt="프로필 이미지" src={tempBox} />
        <div>
          <h1>{nickname}</h1>
          <p>{email}</p>
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

      <p onClick={() => setShowModal(true)}>탈퇴하기</p>
      {showModal && (
        <Modal
          content={isWithdrawn ? '탈퇴되었습니다.' : '정말 탈퇴하시겠어요? 😭'}
          leftButtonContent={!isWithdrawn ? '탈퇴하기' : null}
          rightButtonContent={!isWithdrawn ? '취소하기' : null}
          closeModal={() => setShowModal(false)}
          leftButtonFn={async () => {
            await deleteUserInfo();
            setIsWithdrawn(true);
          }}
          rightButtonFn={() => setShowModal(false)}
          isWithDrawn={isWithdrawn}
        />
      )}
    </StyledRoot>
  );
}

export default SettingProfile;

const StyledRoot = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
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
  & > p:last-child {
    position: absolute;
    bottom: 0;
    color: ${packmanColors.gray};
    font-weight: 300;
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
