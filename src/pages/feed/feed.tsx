import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';

export const Feed: FC = () => {
  /** TODO: взят ь переменную из стора */
  const orders: TOrder[] = [];

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
