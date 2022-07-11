import { useContext } from 'react';
import { APIService, METHOD } from '../../service';
import { APIContext } from '../context/apiContext';

function useAPI(callback: (api: APIService) => METHOD) {
  const api = useContext(APIContext);

  return callback(api);
}

export default useAPI;
