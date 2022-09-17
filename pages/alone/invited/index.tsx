import InvitedLanding from '../../../components/alone/invited/InvitedLanding';
import { AsyncBoundary } from '../../../utils/AsyncBoundary';

function InvitedForAlone() {
  return (
    <AsyncBoundary>
      <InvitedLanding />
    </AsyncBoundary>
  );
}

export default InvitedForAlone;
