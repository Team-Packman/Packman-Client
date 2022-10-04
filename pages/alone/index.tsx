import AloneLanding from '../../components/alone/AloneLanding';
import HeadMeta from '../../components/HeadMeta';
import { AsyncBoundary } from '../../utils/AsyncBoundary';
interface AloneProps {
  title: string;
}
function Alone(props: AloneProps) {
  const { title } = props;

  return (
    <>
      <HeadMeta title={title} />
      <AsyncBoundary>
        <AloneLanding />
      </AsyncBoundary>
    </>
  );
}

export default Alone;
