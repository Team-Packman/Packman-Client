import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import useAPI from '../../utils/hooks/useAPI';
import { useMutation, useQueryClient } from 'react-query';
import { ProfileList } from '../../utils/profileImages';
import { FONT_STYLES } from '../../styles/font';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authUserAtom, creatingUserAtom } from '../../utils/recoil/atom/atom';

interface SelectProfileSectionProps {
  isEditing?: boolean;
  oldNickname?: string;
  oldProfileImageId?: string;
  finishEditing?: () => void;
}

function SelectProfileSection(props: SelectProfileSectionProps) {
  const queryClient = useQueryClient();
  const { isEditing, oldNickname, oldProfileImageId, finishEditing } = props;
  const profileImage = ProfileList.map((e: StaticImageData, i: number) => ({ id: i + '', src: e }));
  const [nickname, setNickname] = useState(oldNickname ? oldNickname : '');
  const [profile, setProfile] = useState(oldProfileImageId ? oldProfileImageId : '0');
  const [index, setIndex] = useState(oldProfileImageId ? oldProfileImageId : ''); //중앙 120px 이미지 다룰 인덱스
  const creatingUser = useRecoilValue(creatingUserAtom);
  const setUser = useSetRecoilState(authUserAtom);

  //프로필 생성
  const addUserProfile = useAPI((api) => api.user.addUserProfile);
  const { mutate: addUserProfileMutate } = useMutation(addUserProfile);

  //프로필 수정
  const updateUserProfile = useAPI((api) => api.user.updateUserProfile);
  const { mutate: updateUserProfileMutate } = useMutation(updateUserProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries('getUserInfo');
    },
  });

  //버튼 활성화 여부
  const setIsActivate = () => {
    if (isEditing) {
      if (!profile) {
        return false;
      }
      return nickname.length > 0;
    } else {
      if (profile) {
        return nickname.length > 0 && nickname.length < 5;
      } else {
        return false;
      }
    }
  };

  //프로필 이미지 클릭(선택) 이벤트 처리
  const onClickProfileImage = (id: string) => {
    if (profile === id) {
      setProfile('');
    } else {
      setProfile(id);
      setIndex(id);
    }
  };

  //닉네임 입력 이벤트 처리
  const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    {
      if (nickname.length > 4) {
        setNickname((prev) => prev.substring(0, 4));
      } else {
        setNickname(e.target.value);
      }
    }
  };

  // 프로필 수정
  const editUserProfile = () => {
    if (finishEditing) {
      updateUserProfileMutate({
        nickname,
        profileImage: profile,
      });
      finishEditing();
    }
  };

  // 회원가입
  const createUserAccount = async () => {
    addUserProfileMutate(
      {
        email: creatingUser.email,
        nickname,
        name: creatingUser.name,
        profileImage: profile,
      },
      {
        onSuccess: ({ data }) => {
          setUser(data);
        },
      },
    );
  };

  const onClickGoToPackingButton = () => {
    isEditing ? editUserProfile() : createUserAccount();
  };

  return (
    <StyledRoot>
      <StyledProfile>
        <div style={{ position: 'relative', width: '12rem', height: '12rem' }}>
          <Image
            src={profileImage[+index].src}
            placeholder="blur"
            alt="profile-image"
            layout="fill"
            priority
          />
        </div>
        <StyledInputWrapper>
          <StyledInput
            type="text"
            placeholder="김팩맨"
            value={nickname}
            maxLength={4}
            onChange={onChangeNickname}
          />
          <StyledText nickname={nickname !== ''}>닉네임을 입력해주세요 (4자 이내)</StyledText>
        </StyledInputWrapper>

        <StyledSelectProfileWrapper>
          {profileImage.map(({ id, src }) => (
            <StyledImageWrapper
              key={id}
              selected={profile === id}
              onClick={() => onClickProfileImage(id)}
            >
              <StyledBackground selected={profile === id} />
              <StyledImage
                key={id}
                src={src}
                alt="profile-image"
                width={80}
                height={80}
                placeholder="blur"
                selected={profile === id}
                priority
              />
            </StyledImageWrapper>
          ))}
        </StyledSelectProfileWrapper>
      </StyledProfile>

      <StyledButton
        type="button"
        disabled={!setIsActivate()}
        isActivate={setIsActivate()}
        onClick={onClickGoToPackingButton}
      >
        {isEditing ? '수정 완료' : '패킹하러 가기'}
      </StyledButton>
    </StyledRoot>
  );
}

export default SelectProfileSection;

const StyledRoot = styled.section`
  display: flex;
  flex-direction: column;
  height: calc(100% - 23.5rem);
  justify-content: space-between;
  margin-top: 4.7rem;
  overflow-y: auto;

  /* 브라우저별 스크롤바 숨김 설정 */
  -ms-overflow-style: none; // Edge
  scrollbar-width: none; // Firefox
  &::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
`;
const StyledProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledInput = styled.input`
  ${FONT_STYLES.SUBHEAD1_SEMIBOLD};
  width: 12rem;
  text-align: center;
  color: ${packmanColors.pmBlack};
  border: none;
  border-bottom: 1px solid ${packmanColors.pmDeepGrey};
  border-radius: 0;
  margin-top: 1.6rem;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #dddddd;
  }
`;
const StyledText = styled.div<{ nickname: boolean }>`
  ${FONT_STYLES.BODY1_REGULAR};
  opacity: ${({ nickname }) => nickname && '0'};
  padding-top: 0.77rem;
  color: ${packmanColors.pmDeepGrey};
`;

const StyledSelectProfileWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 28rem;
  margin: 1.5rem 0 5.57rem 0;
`;
const StyledImageWrapper = styled.div<{ selected: boolean }>`
  position: relative;

  width: 8.6rem;
  height: 8.6rem;
  border: ${({ selected }) =>
    selected ? `3px solid ${packmanColors.pmPink}` : '3px solid transparent'};
  border-radius: 0.8rem;
  margin-right: 0.4rem;
`;
const StyledBackground = styled.div<{ selected: boolean }>`
  position: absolute;
  transform: translate(-0.1rem, -0.1rem);

  width: 8.2rem;
  height: 8.2rem;
  border-radius: 0.7rem;
  background: url('assets/svg/iSelected.svg') no-repeat center;
  background-color: ${({ selected }) => (selected ? 'rgba(0,0,0,0.48)' : 'transparent')};
  z-index: ${({ selected }) => selected && '1'};
`;
const StyledImage = styled(Image)<{ selected: boolean }>`
  z-index: ${({ selected }) => selected && '0'};
`;
const StyledButton = styled.button<{ isActivate: boolean }>`
  ${FONT_STYLES.BODY4_SEMIBOLD};
  width: calc(100vw - 4rem);
  height: 4.1rem;
  border: none;
  border-radius: 0.8rem;
  padding: 1.2rem 6.4rem;
  color: ${packmanColors.pmWhite};
  background-color: ${({ isActivate }) =>
    isActivate ? packmanColors.pmPink : packmanColors.pmGrey};
`;
