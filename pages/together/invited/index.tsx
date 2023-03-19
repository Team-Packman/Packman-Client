import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import HeadMeta from '../../../components/HeadMeta';
import InvitedLanding from '../../../components/together/invited/InvitedLanding';
import apiService from '../../../service';
import { AsyncBoundary } from '../../../utils/AsyncBoundary';
import { client } from '../../../utils/axios';

interface InvitedProps {
  title: string;
}
function Invited(props: InvitedProps) {
  const { title } = props;
  const router = useRouter();

  return (
    <>
      <HeadMeta
        title={title}
        description={`[${title}] 패킹리스트가 공유되었어요!`}
        url={`${process.env.NEXT_PUBLIC_DOMAIN}/${router.asPath}`}
      />
      <AsyncBoundary>
        <InvitedLanding />;
      </AsyncBoundary>
    </>
  );
}

export default Invited;

Invited.getInitialProps = async function ({ req, query }: NextPageContext) {
  const getSharedPackingListDetail = apiService.packingList.common.getSharedPackingListDetail;
  const cookie = req?.headers?.cookie?.split(';');
  const regex = new RegExp(/(?<=accessToken=).+/, 'g');
  const accessToken = cookie && cookie[1].match(regex);

  client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  const { data: info } = await getSharedPackingListDetail({
    type: 'together',
    inviteCode: query.inviteCode as string,
  });
  const { title } = info;
  return {
    title,
  };
};
