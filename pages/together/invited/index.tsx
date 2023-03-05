import InvitedLanding from '../../../components/together/invited/InvitedLanding';
import { AsyncBoundary } from '../../../utils/AsyncBoundary';

function Invited() {
  return (
    <>
      <AsyncBoundary>
        <InvitedLanding />;
      </AsyncBoundary>
    </>
  );
}

export default Invited;
