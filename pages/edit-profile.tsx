import Header from '../components/common/Header';
import styled from 'styled-components';
import { useState } from 'react';
import useAPI from '../utils/hooks/useAPI';
import { useQuery } from 'react-query';
import EditingProfile from './components/profile/EditingProfile';
import SettingProfile from './components/profile/SettingProfile';

function EditProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const getUserInfo = useAPI((api) => api.user.getUserInfo);
  const { data } = useQuery('getUserInfo', () => getUserInfo());

  if (!data) return null;

  const { nickname } = data.data;

  return (
    <StyledRoot>
      {isEditing ? (
        <>
          <Header />
          <EditingProfile
            comment={
              <h1>
                <b>프로필 수정</b>을 완료해주세요!
              </h1>
            }
            oldNickname={nickname}
            finishEditing={() => {
              setIsEditing(false);
            }}
          />
        </>
      ) : (
        <>
          <Header back title="MY" />
          <SettingProfile onClickEditText={() => setIsEditing(true)} profileData={data.data} />
        </>
      )}
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
