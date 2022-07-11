import { rest, RestRequest } from 'msw';

const mock = {
  status: 200,
  success: true,
  message: 'success',
  data: {
    members: [
      {
        id: 'skgjfdfkgw55',
        nickname: '융맨',
        profileImageId: '1',
      },
      {
        id: 'ssdfgsgf5',
        nickname: '서히',
        profileImageId: '2',
      },
      {
        id: 'ykyujhgh',
        nickname: '현지',
        profileImageId: '3',
      },
      {
        id: 'dslfkgjs;ldkgj',
        nickname: '경린',
        profileImageId: '4',
      },
    ],
  },
};

export const handlers = [
  rest.get('/together/member/:groupId', (req, res, ctx) => {
    const error = req.url.searchParams.get('error');
    if (error) {
      return res(ctx.status(400, error));
    }

    return res(ctx.status(200), ctx.json(mock));
  }),
];
