import { useRouter } from 'next/router';
import HeadMeta from '../../components/HeadMeta';
import TogetherLanding from '../../components/together/TogetherLanding';
import { AsyncBoundary } from '../../utils/AsyncBoundary';
import { NextPageContext } from 'next';
import apiService from '../../service';
import { client } from '../../utils/axios';
import cookies from 'next-cookies';

interface TogetherProps {
  title: string;
}
function Together(props: TogetherProps) {
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
        <TogetherLanding />
      </AsyncBoundary>
    </>
  );
}

export default Together;

export const getServerSideProps = async ({ req, query }: NextPageContext) => {
  const getPackingListHeader = apiService.packingList.together.getPackingListHeader;

  const allCookies = cookies({ req: { headers: { cookie: req?.headers.cookie } } });
  const accessToken = allCookies['accessToken'];

  Object.assign(client.defaults.headers, { Authorization: `Bearer ${accessToken}` });

  const { data: header } = await getPackingListHeader(query.id as string, false);
  const { title } = header;
  return {
    props: {
      title,
    },
  };
};
