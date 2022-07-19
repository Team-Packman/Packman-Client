import { AsyncBoundary } from '../utils/AsyncBoundary';
import ManageMemberLanding from './components/manageMember/ManageMemberLanding';

function ManageMember() {
  return (
    <AsyncBoundary>
      <ManageMemberLanding />
    </AsyncBoundary>
  );
}

export default ManageMember;
