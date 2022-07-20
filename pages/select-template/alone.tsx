import { AsyncBoundary } from '../../utils/AsyncBoundary';
import TogetherSelectTemplateLanding from '../components/selectTemplate/together/TogetherSelectTemplateLanding';

function index() {
  return (
    <AsyncBoundary>
      <TogetherSelectTemplateLanding />
    </AsyncBoundary>
  );
}

export default index;
