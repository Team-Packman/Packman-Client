import { AsyncBoundary } from '../../utils/AsyncBoundary';
import AloneSelectTemplateLanding from '../../components/selectTemplate/alone/AloneSelectTemplateLanding';

function index() {
  return (
    <AsyncBoundary>
      <AloneSelectTemplateLanding />
    </AsyncBoundary>
  );
}

export default index;
