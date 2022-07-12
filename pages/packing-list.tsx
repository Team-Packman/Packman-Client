import SwipeablePackingList from '../components/SwipeablePackingList';
import axios from 'axios';
import { useQuery } from 'react-query';
// import useAPI from '../utils/hooks/useAPI';

export default function PackingList() {
  //   const { isLoading, data, error } = useQuery('packingList', async () => {
  //     const { data } = await axios.get('api/pack');
  //     return data;
  //   });
  return <SwipeablePackingList />;
}

/*interface Pack {
  id: number;
  date: string;
  title: string;
  bag: number;
} */
