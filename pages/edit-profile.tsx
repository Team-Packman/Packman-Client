import EditProfileLanding from '../components/profile/EditProfileLanding';
import { AsyncBoundary } from '../utils/AsyncBoundary';

function EditProfile() {
  return (
    <AsyncBoundary>
      <EditProfileLanding />
    </AsyncBoundary>
  );
}

EditProfile.displayName = 'EditProfile';
export default EditProfile;
