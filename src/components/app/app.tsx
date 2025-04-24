import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { Modal, OrderInfo, IngredientDetails } from '@components';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';

import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';

import { RootState, useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients } from '../../slices/burgerSlice';
import { fetchGetUser } from '../../slices/userSlice';
import { useSelector } from '../../services/store';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGetUser());
    dispatch(fetchIngredients());
  }, [dispatch]);

  const background = location.state && location.state.background;

  const orderNumber = useSelector(
    (state: RootState) => state.feed.selectedOrder?.number
  );

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={`${orderNumber ?? ''}`}
                onClose={() => navigate(-1)}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='' onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}

      {background && (
        <Routes>
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='' onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
