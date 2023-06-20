import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import styles from './reset-password.module.css';
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import authentication from '../../utils/authentication-api';
import { SET_NEW_PASSWORD_URL } from '../../constants/constants';
import { useDispatch } from 'react-redux';
import { resetPasswordFailed, resetPasswordRequest, resetPasswordSuccess } from '../../services/slices/reset-password';

const ResetPassword = () => {
  const [newPasswordValue, setNewPasswordValue] = useState('');
  const [recoveryCodeValue, setRecoveryCodeValue] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const isRedirectFromForgotPasswordPage = location.state === '/forgot-password';

  const handleResetPassword = () => {
    dispatch(resetPasswordRequest());
    authentication(SET_NEW_PASSWORD_URL, {
      body: {
        password: newPasswordValue,
        token: recoveryCodeValue,
      },
    })
      .then(() => {
        dispatch(resetPasswordSuccess());
        navigate('/login');
      })
      .catch((error) => {
        dispatch(resetPasswordFailed());
        console.log(error);
      });
  };

  return isRedirectFromForgotPasswordPage ? (
    <main className={styles.wrapper}>
      <h2 className={styles.header}>Восстановление пароля</h2>
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <PasswordInput
          onChange={(e) => setNewPasswordValue(e.target.value)}
          value={newPasswordValue}
          name={'newPassword'}
          extraClass="mb-2"
          placeholder="Введите новый пароль"
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={(e) => setRecoveryCodeValue(e.target.value)}
          value={recoveryCodeValue}
          name={'name'}
          error={false}
          size={'default'}
          extraClass="ml-1 mt-6"
        />
      </form>
      <Button onClick={handleResetPassword} extraClass="mt-4" htmlType="button" type="primary" size="large">
        Сохранить
      </Button>
      <p className="mt-20 mb-6">
        Вспомнили пароль? <Link to={'/login'}>Войти</Link>
      </p>
    </main>
  ) : (
    <Navigate to={'/forgot-password'} replace />
  );
};

export default ResetPassword;
