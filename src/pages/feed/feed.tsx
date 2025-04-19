import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { fetchGetFeeds } from '../../slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  useEffect(() => {
    dispatch(fetchGetFeeds());
  }, [dispatch]);

  const orders: TOrder[] = useSelector((state) => state.feed.orders);

  const handleGetFeeds = () => {
    dispatch(fetchGetFeeds());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
