import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { packmanColors } from '../../styles/color';
import useAPI from '../../utils/hooks/useAPI';
import { useMutation, useQueryClient } from 'react-query';
import { ProfileList } from '../../utils/profileImages';
import useGlobalState from '../../utils/hooks/useGlobalState';
import { User } from '../../type/globalState';

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
  const [nickname, setNickname] = useState('');
  const [profile, setProfile] = useState('');
  const [index, setIndex] = useState(''); //중앙 120px 이미지 다룰 인덱스
  const [user, setUser] = useGlobalState<User>('User');
  console.log(user);
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
  const updateUserProfile = useAPI(
    (api) => (info: UpdateUserProfileData) => api.user.updateUserProfile(info),
  );
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
  useEffect(() => {
    if (oldProfileImageId) {
      setProfile(oldProfileImageId);
    }
    if (oldNickname) {
      setNickname(oldNickname);
    }
  }, []);

  const onClickProfileImage = (id: string) => {
    if (profile === id) {
      setProfile('');
    } else {
      setProfile(id);
      setIndex(id);
    }
  };
  console.log(user);
  return (
    <StyledRoot>
      <div style={{ position: 'relative', width: '12rem', height: '12rem' }}>
        <Image src={profileImage[+index].src} alt="profile-image" layout="fill" />
      </div>
      <StyledInputWrapper>
        <StyledInput
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
            />
          </StyledImageWrapper>
        ))}
      </StyledSelectProfileWrapper>

      <StyledButton
        type="button"
        disabled={!setIsActivate()}
        isActivate={setIsActivate()}
        onClick={
          isEditing
            ? async () => {
                if (finishEditing) {
                  updateUserProfileMutate({
                    name: nickname,
                    profileImageId: profile,
                  });
                  finishEditing();
                }
              }
            : () => {
                addUserProfileMutate(
                  {
                    email: user.email,
                    name: nickname,
                    profileImageId: profile,
                  },
                  {
                    onSuccess: (data) => {
                      setUser(data.data);
                      router.push('/');
                    },
                  },
                );
              }
        }
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
const StyledText = styled.div<{ nickname: boolean }>`
  opacity: ${({ nickname }) => nickname && '0'};
  padding-top: 0.77rem;
  color: ${packmanColors.pmDeepGrey};
  font-weight: 400;
  font-size: 1.3rem;
`;
const StyledInput = styled.input`
  width: 12rem;
  text-align: center;
  font-weight: 600;
  font-size: 1.6rem;
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
  font-weight: 600;
  font-size: 1.4rem;
  color: ${packmanColors.pmWhite};
  background-color: ${({ isActivate }) =>
    isActivate ? packmanColors.pmPink : packmanColors.pmGrey};
`;
