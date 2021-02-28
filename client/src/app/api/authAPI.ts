import { User } from '../types/user';
import axiosClient from './axiosClient';

const login = async (): Promise<User> => {
  return axiosClient.post('/auth/login');
};

const logout = async () => {
  return axiosClient.post('/auth/logout');
};

const getMe = async (): Promise<User> => {
  return axiosClient.get('/auth/me');
};

const authAPI = {
  login,
  logout,
  getMe,
};

export default authAPI;
