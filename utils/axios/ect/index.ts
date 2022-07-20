import { AxiosInstance } from 'axios';
import { GetAloneTemplateListOutput } from '../../../service/ect/index';

// export const fetchTemplateList = async (request: AxiosInstance): Promise<GetTemplateListOutput> => {
//   return new Promise((r) =>
//     setTimeout(() => {
//       r({
//         status: 200,
//         success: true,
//         message: '템플릿 리스트 조회 성공',
//         data: {
//           basicTemplate: [
//             {
//               id: '1',
//               title: '국내여행',
//             },
//             {
//               id: '2',
//               title: '해외여행',
//             },
//             {
//               id: '3',
//               title: '콘서트',
//             },
//             {
//               id: '4',
//               title: '토익시험',
//             },
//             {
//               id: '5',
//               title: '제주한달살이',
//             },
//             {
//               id: '6',
//               title: '반려동물과 함께여행',
//             },
//           ],
//           myTemplate: [
//             {
//               id: '7',
//               title: '앱잼 합숙',
//             },
//             {
//               id: '8',
//               title: '엠티',
//             },
//           ],
//         },
//       });
//     }, 500),
//   );
// };

export const fetchAloneTemplateList = async (
  request: AxiosInstance,
): Promise<GetAloneTemplateListOutput> => {
  const { data } = await request(`/template/alone`);
  return data;
};

// export const fetchHelpTemplate = async (request: AxiosInstance): Promise<GetHelpTemplateOutput> => {
//   return new Promise((r) =>
//     setTimeout(() => {
//       r({
//         status: 200,
//         success: true,
//         message: '엿보기 조회 성공',
//         data: {
//           id: '62bbb80d9d5dc1aa4c3d2839',
//           category: [
//             {
//               id: '62bbb80d9d5dc1aa4c3d2839',
//               name: '필수',
//               pack: [
//                 {
//                   id: '62bbb80d9d5dc1aa4c3d2839',
//                   name: '여권',
//                 },
//                 {
//                   id: '62bbb80d9d5dc1aa4c3d2839',
//                   name: '보조배터리',
//                 },
//               ],
//             },
//           ],
//         },
//       });
//     }, 500),
//   );
// };
