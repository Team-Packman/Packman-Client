import InvitedLanding from '../../../components/together/invited/InvitedLanding';
import { AsyncBoundary } from '../../../utils/AsyncBoundary';

function Invited() {
  return (
    <>
      <AsyncBoundary>
        <InvitedLanding />;
      </AsyncBoundary>
    </>
  );
}

export default Invited;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { inviteCode } = context.query;

//   const { data }: AxiosResponse<GetSharedPackingListDetailOutput> = await axios.get(
//     `${process.env.NEXT_PUBLIC_END}/list/together/share/${inviteCode}`,
//   );
//   const {
//     data: { title },
//   } = data;

//   return {
//     props: {
//       title,
//       description: '내 손안 짐 챙김 도우미, 팩맨. 지금 바로 팩맨을 사용해보세요!',
//     },
//   };
// };
