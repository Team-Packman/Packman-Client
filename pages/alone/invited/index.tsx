import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import HeadMeta from '../../../components/HeadMeta';
import InvitedLanding from '../../../components/alone/invited/InvitedLanding';
import apiService from '../../../service';
import { AsyncBoundary } from '../../../utils/AsyncBoundary';

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

  const { data: info } = await getSharedPackingListDetail({
    type: 'alone',
    inviteCode: query.inviteCode as string,
  });
  const { title } = info;
  return {
    title,
  };
};
