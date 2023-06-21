import './app.css';
import { Main, Page404, Profile, Login, Register, ResetPassword, ForgotPassword } from '../../pages';
import AppHeader from '../app-header/app-header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import getUserInformation from '../../utils/getUserInformation';
import ProtectedRouteElement from '../protected-route-element/protected-route-element';
import ProtectedRouteAuthorized from '../protected-route-authorized/protected-route-authorized';
import Feed from '../../pages/feed/feed';
import { fetchIngredients } from '../../services/slices/burger-ingredients';
import Spinner from '../spinner/spinner';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { TToken } from '../../types';
import {
  PATH_CONSTRUCTOR_PAGE,
  PATH_FEED,
  PATH_FORGOT_PASSWORD_PAGE,
  PATH_LOGIN_PAGE,
  PATH_PROFILE_PAGE,
  PATH_REGISTER_PAGE,
  PATH_RESET_PASSWORD_PAGE,
} from '../../constants/constants';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const accessToken: TToken = useAppSelector((store) => store.profile.accessToken);
  const refreshToken: TToken = localStorage.getItem('refreshToken');

  useEffect(() => {
    dispatch(fetchIngredients());
    getUserInformation(dispatch, accessToken, refreshToken);
  }, []);

  const loading: boolean = useAppSelector((store) => store.burgerIngredients.loading);
  const isLoggedIn: boolean = useAppSelector((store) => store.profile.isLoggedIn);

  return loading && !isLoggedIn ? (
    <Spinner height={'calc(100vh - 128px)'} />
  ) : (
    <Router>
      <AppHeader />
      <main className={'content'}>
        <Routes>
          <Route path={`${PATH_CONSTRUCTOR_PAGE}*`} element={<Main />} />
          <Route path={`${PATH_PROFILE_PAGE}/*`} element={<ProtectedRouteElement element={<Profile />} />} />
          <Route path={PATH_LOGIN_PAGE} element={<ProtectedRouteAuthorized element={<Login />} />} />
          <Route path={`${PATH_FEED}/*`} element={<Feed />} />
          <Route path={PATH_REGISTER_PAGE} element={<ProtectedRouteAuthorized element={<Register />} />} />
          <Route path={PATH_RESET_PASSWORD_PAGE} element={<ProtectedRouteAuthorized element={<ResetPassword />} />} />
          <Route path={PATH_FORGOT_PASSWORD_PAGE} element={<ProtectedRouteAuthorized element={<ForgotPassword />} />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
