import { useContext } from 'react';
import { APIService } from '../../service';
import { APIContext } from '../context/apiContext';

function useAPI<Req extends unknown[], Res>(
  callback: (api: APIService) => (...args: Req) => Promise<Res>,
) {
  const { api } = useContext(APIContext);

  return callback(api);
}

export default useAPI;
