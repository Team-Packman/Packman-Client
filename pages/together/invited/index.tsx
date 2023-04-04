import { NextPageContext } from 'next';
import InvitedLanding from '../../../components/together/invited/InvitedLanding';
import HeadMeta from '../../../components/HeadMeta';
import { AsyncBoundary } from '../../../utils/AsyncBoundary';
import apiService from '../../../service';
import { useRouter } from 'next/router';

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
    type: 'together',
    inviteCode: query.inviteCode as string,
  });
  const { title } = info;
  return {
    title,
  };
};
