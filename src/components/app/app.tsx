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

import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />

      <Route
        path='/login'
        element={
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        }
      />

      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/profile/orders' element={<ProfileOrders />} />
      <Route path='*' element={<NotFound404 />} />

      <Route
        path='/feed/:number'
        element={
          <Modal title='' onClose={() => {}}>
            <OrderInfo />
          </Modal>
        }
      />
      <Route
        path='/ingredients/:id'
        element={
          <Modal title='' onClose={() => {}}>
            <IngredientDetails />
          </Modal>
        }
      />
      <Route
        path='/profile/orders/:number'
        element={
          <Modal title='' onClose={() => {}}>
            <OrderInfo />
          </Modal>
        }
      />
    </Routes>
  </div>
);

export default App;

{
  /* <AppHeader /> */
}
{
  /* <ConstructorPage /> */
}
