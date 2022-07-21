import { AsyncBoundary } from '../utils/AsyncBoundary';
import ProfileLanding from '../components/profile/ProfileLanding';

function Profile() {
  return (
    <AsyncBoundary>
      <ProfileLanding />
    </AsyncBoundary>
  );
}

export default Profile;
