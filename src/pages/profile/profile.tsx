import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, RootState, useDispatch } from '../../services/store';
import { useMemo } from 'react';
import { fetchUpdateUser } from '../../slices/userSlice';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const user = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch();
  // if (!user) {
  //   return 'Пользователя нет';
  // }
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });
  // const user = {
  //   name: '',
  //   email: ''
  // };

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    // user !== null &&
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchUpdateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!user) return;
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  console.log(formValue, user, isFormChanged);
  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
