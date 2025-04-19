import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { fetchGetOrders } from '../../slices/profileOrderSlice';
export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetOrders());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(
    (state: RootState) => state.profileOrders.orders
  );

  return <ProfileOrdersUI orders={orders} />;
};
