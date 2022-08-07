import Header from '../components/common/Header';
import styled from 'styled-components';
import { useState } from 'react';
import useAPI from '../utils/hooks/useAPI';
import { useQuery } from 'react-query';
import EditingProfile from '../components/profile/EditingProfile';
import SettingProfile from '../components/profile/SettingProfile';
import { packmanColors } from '../styles/color';
import { FONT_STYLES } from '../styles/font';

function EditProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const getUserInfo = useAPI((api) => api.user.getUserInfo);
  const { data } = useQuery('getUserInfo', () => getUserInfo());

  if (!data) return null;

  const { name, profileImageId } = data.data;

  return (
    <>
      {isEditing ? <Header /> : <Header back title="MY" />}
      <StyledRoot>
        {isEditing ? (
          <>
            <EditingProfile
              comment={
                <StyledTitle>
                  <b>프로필 수정</b>을 완료해주세요!
                </StyledTitle>
              }
              oldNickname={name}
              oldProfileImageId={profileImageId}
              finishEditing={() => {
                setIsEditing(false);
              }}
            />
          </>
        ) : (
          <>
            <SettingProfile onClickEditText={() => setIsEditing(true)} profileData={data.data} />
          </>
        )}
      </StyledRoot>
    </>
  );
}

export default EditProfile;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  width: 100vw;
  height: 100vh;
`;
const StyledTitle = styled.h1`
  ${FONT_STYLES.DISPLAY1_LIGHT};
  color: ${packmanColors.pmBlack};
  word-break: break-all;
  word-wrap: break-word;

  & > b {
    ${FONT_STYLES.DISPLAY2_SEMIBOLD};
  }
`;
