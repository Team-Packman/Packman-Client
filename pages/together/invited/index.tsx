import axios, { AxiosResponse } from 'axios';
import { GetServerSideProps } from 'next';
import HeadMeta from '../../../components/HeadMeta';
import InvitedLanding from '../../../components/together/invited/InvitedLanding';
import { GetSharedPackingListDetailOutput } from '../../../service/packingList/common';
import { AsyncBoundary } from '../../../utils/AsyncBoundary';

interface InvitedProps {
  title: string;
  description: string;
  url: string;
}
function Invited(props: InvitedProps) {
  const { title, description, url } = props;

  return (
    <AsyncBoundary>
      <HeadMeta title={title} description={description} url={url} />
      <InvitedLanding />;
    </AsyncBoundary>
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
      description: '내 손안 짐 챙김 도우미, 팩맨. 지금 바로 팩맨을 사용해보세요!',
      url: `https://www.packman.kr/together/invited?inviteCode=${inviteCode}`,
    },
  };
};
