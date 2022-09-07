import styled from 'styled-components';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Layout from '../common/Layout';
import EditingProfile from './EditingProfile';
import SettingProfile from './SettingProfile';
import useAPI from '../../utils/hooks/useAPI';

function EditProfileLanding() {
  const [isEditing, setIsEditing] = useState(false);
  const finishEditingProfileHandler = () => setIsEditing(false);
  const layoutProps = {
    ...(!isEditing ? { back: true, title: 'MY' } : { noHeader: true }),
  };

  const getUserInfo = useAPI((api) => api.user.getUserInfo);
  const { data } = useQuery('getUserInfo', () => getUserInfo());

  if (!data) return null;

  const { nickname, profileImage } = data.data;

  return (
    <Layout {...layoutProps} padding>
      <StyledRoot isEditing={isEditing}>
        {isEditing ? (
          <EditingProfile
            comment={
              <h1>
                <b>프로필 수정</b>을 완료해주세요!
              </h1>
            }
            oldNickname={nickname}
            oldProfileImageId={profileImage}
            finishEditing={finishEditingProfileHandler}
          />
        ) : (
          <SettingProfile onClickEditText={() => setIsEditing(true)} profileData={data.data} />
        )}
      </StyledRoot>
    </Layout>
  );
}

export default EditProfileLanding;

const StyledRoot = styled.div<{ isEditing: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-top: ${({ isEditing }) => isEditing && '4rem'};
  overflow-y: auto;

  /* 브라우저별 스크롤바 숨김 설정 */
  -ms-overflow-style: none; // Edge
  scrollbar-width: none; // Firefox
  &::-webkit-scrollbar {
    display: none; // Chrome, Safari, Opera
  }
`;
