import { AsyncBoundary } from '../../../utils/AsyncBoundary';
import SharedLanding from '../../../components/alone/shared/SharedLanding';

function SharedForAlone() {
  return (
    <AsyncBoundary>
      <SharedLanding />
    </AsyncBoundary>
  );
}

export default SharedForAlone;
