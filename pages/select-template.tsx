import { AsyncBoundary } from '../utils/AsyncBoundary';
import SelectTemplateLanding from './components/selectTemplate/SelectTemplateLanding';

function SelectTemplate() {
  return (
    <AsyncBoundary>
      <SelectTemplateLanding />
    </AsyncBoundary>
  );
}

export default SelectTemplate;
