import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import useAPI from '../../utils/hooks/useAPI';
import { useMutation, useQueryClient } from 'react-query';
import { ProfileList } from '../../utils/profileImages';
import { FONT_STYLES } from '../../styles/font';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authedUser, creatingUser } from '../../utils/recoil/atom/atom';

interface AddUserProfileData {
  email: string; // 회원가입한 유저의 이메일
  name: string; // 회원가입한 유저의 닉네임
  profileImageId: string; // 회원가입한 유저의 프로필 이미지
}

interface UpdateUserProfileData {
  name: string;
  profileImageId: string;
}

interface SelectProfileSectionProps {
  isEditing?: boolean;
  oldNickname?: string;
  oldProfileImageId?: string;
  finishEditing?: () => void;
}

function SelectProfileSection(props: SelectProfileSectionProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isEditing, oldNickname, oldProfileImageId, finishEditing } = props;
  const profileImage = ProfileList.map((e: StaticImageData, i: number) => ({ id: i + '', src: e }));
  const [nickname, setNickname] = useState(oldNickname ? oldNickname : '');
  const [profile, setProfile] = useState(oldProfileImageId ? oldProfileImageId : '0');
  const [index, setIndex] = useState(oldProfileImageId ? oldProfileImageId : ''); //중앙 120px 이미지 다룰 인덱스
  const setUser = useSetRecoilState(authedUser);
  const user = useRecoilValue(creatingUser);

  //프로필 생성
  const addUserProfile = useAPI((api) => api.user.addUserProfile);
  const { mutate: addUserProfileMutate } = useMutation(
    (addUserProfileData: AddUserProfileData) => {
      return addUserProfile(addUserProfileData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getUserInfo');
      },
    },
  );

  //프로필 수정
  const updateUserProfile = useAPI((api) => api.user.updateUserProfile);
  const { mutate: updateUserProfileMutate } = useMutation(
    (updateUserProfileData: UpdateUserProfileData) => {
      return updateUserProfile(updateUserProfileData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getUserInfo');
      },
    },
  );

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
        name: nickname,
        profileImageId: profile,
      });
      finishEditing();
    }
  };

  // 회원가입
  const createUserAccount = () => {
    addUserProfileMutate(
      {
        email: user.email,
        name: nickname,
        profileImageId: profile,
      },
      {
        onSuccess: ({ data }) => {
          setUser(data);
          router.push('/folder');
        },
      },
    );
  };

  const onClickGoToPackingButton = () => {
    isEditing ? editUserProfile() : createUserAccount();
  };

  return (
    <StyledRoot>
      <div style={{ position: 'relative', width: '12rem', height: '12rem' }}>
        <Image src={profileImage[+index].src} alt="profile-image" layout="fill" priority />
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
            <StyledImage
              key={id}
              src={src}
              alt="profile-images"
              width={80}
              height={80}
              selected={profile === id}
              priority
            />
          </StyledImageWrapper>
        ))}
      </StyledSelectProfileWrapper>

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
  align-items: center;
  height: 100%;
  margin-top: 4.84rem;
`;
const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledInput = styled.input`
  width: 12rem;
  text-align: center;
  ${FONT_STYLES.SUBHEAD1_SEMIBOLD};
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
  opacity: ${({ nickname }) => nickname && '0'};
  padding-top: 0.77rem;
  color: ${packmanColors.pmDeepGrey};
  ${FONT_STYLES.BODY1_REGULAR};
`;

const StyledSelectProfileWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 28rem;
  gap: 0.8rem;
  margin: 1.5rem 0 5.57rem 0;
`;
const StyledImageWrapper = styled.div<{ selected: boolean }>`
  width: 8.6rem;
  height: 8.6rem;
  background: url('assets/svg/iSelected.svg') no-repeat center;
  background-color: ${({ selected }) => (selected ? 'rgba(0,0,0,0.48)' : 'transparent')};
  border: ${({ selected }) =>
    selected ? `3px solid ${packmanColors.pmPink}` : '3px solid transparent'};
  border-radius: 0.8rem;
`;
const StyledImage = styled(Image)<{ selected: boolean }>`
  z-index: ${({ selected }) => selected && '-1'};
`;
const StyledButton = styled.button<{ isActivate: boolean }>`
  position: absolute;
  bottom: 1.5rem;
  width: 33.6rem;
  height: 4.1rem;
  border: none;
  border-radius: 0.8rem;
  padding: 1.2rem 6.4rem;
  ${FONT_STYLES.BODY4_SEMIBOLD};
  color: ${packmanColors.pmWhite};
  background-color: ${({ isActivate }) =>
    isActivate ? packmanColors.pmPink : packmanColors.pmGrey};
`;
