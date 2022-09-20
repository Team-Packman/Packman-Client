import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import HeadMeta from '../../../components/HeadMeta';
import InvitedLanding from '../../../components/together/invited/InvitedLanding';
import { GetSharedPackingListDetailOutput } from '../../../service/packingList/common';
import { AsyncBoundary } from '../../../utils/AsyncBoundary';

interface InvitedProps {
  title: string;
}
function Invited(props: InvitedProps) {
  const { title } = props;
  return (
    <>
      <HeadMeta title={title} />
      <AsyncBoundary>
        <InvitedLanding />;
      </AsyncBoundary>
    </>
  );
}

export default Invited;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { inviteCode } = context.query;
  const { data }: AxiosResponse<GetSharedPackingListDetailOutput> = await axios.get(
    `${process.env.NEXT_PUBLIC_END}/list/together/share/${inviteCode}`,
  );
  const {
    data: { title },
  } = data;

  return {
    props: {
      title,
    },
  };
};
