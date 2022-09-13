import HeadMeta from '../components/HeadMeta';
import EditProfileLanding from '../components/profile/EditProfileLanding';
import { AsyncBoundary } from '../utils/AsyncBoundary';

function EditProfile() {
  return (
    <AsyncBoundary>
      <EditProfileLanding />
    </AsyncBoundary>
  );
}

EditProfile.displayName = 'edit-profile';
export default EditProfile;
