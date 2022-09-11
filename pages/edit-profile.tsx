import HeadMeta from '../components/HeadMeta';
import EditProfileLanding from '../components/profile/EditProfileLanding';
import { AsyncBoundary } from '../utils/AsyncBoundary';

function EditProfile() {
  return (
    <AsyncBoundary>
      <HeadMeta description="문의하기" />
      <EditProfileLanding />
    </AsyncBoundary>
  );
}

export default EditProfile;
