import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import AloneLanding from '../../components/alone/AloneLanding';
import HeadMeta from '../../components/HeadMeta';
import apiService from '../../service';
import { AsyncBoundary } from '../../utils/AsyncBoundary';
import { client } from '../../utils/axios';

interface AloneProps {
  title: string;
}
function Alone(props: AloneProps) {
  const { title: headerTitle } = props;
  const router = useRouter();

  return (
    <>
      <HeadMeta
        title={headerTitle}
        description={`[${headerTitle}] 패킹리스트가 공유되었어요!`}
        url={`${process.env.NEXT_PUBLIC_DOMAIN}/${router.asPath}`}
      />
      <AsyncBoundary>
        <AloneLanding />
      </AsyncBoundary>
    </>
  );
}

export default Alone;

Alone.getInitialProps = async function ({ req, query }: NextPageContext) {
  const getPackingListHeader = apiService.packingList.together.getPackingListHeader;
  const cookie = req?.headers?.cookie?.split(';');
  const regex = new RegExp(/(?<=accessToken=).+/, 'g');
  const accessToken = cookie && cookie[1].match(regex);

  client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  const { data: header } = await getPackingListHeader(query.id as string, true);
  const { title } = header;
  return {
    title,
  };
};
