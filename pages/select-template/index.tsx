import SelectTemplateLanding from '../../components/selectTemplate/SelectTemplateLanding';
import { AsyncBoundary } from '../../utils/AsyncBoundary';

function index() {
  return (
    <AsyncBoundary>
      <SelectTemplateLanding />
    </AsyncBoundary>
  );
}

export default index;
